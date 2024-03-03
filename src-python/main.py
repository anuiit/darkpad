"""This is an example of how to use async langchain with fastapi and return a streaming response.
The latest version of Langchain has improved its compatibility with asynchronous FastAPI,
making it easier to implement streaming functionality in your applications.
"""
import asyncio

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from langchain.callbacks import AsyncIteratorCallbackHandler
from pydantic import BaseModel
from langchain_community.chat_models import ChatOllama

from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain.memory import  ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.prompts.prompt import PromptTemplate

embedd_model = "BAAI/bge-small-en"
embedd_kwargs = {"device": "cpu"}
encode_kwargs = {"normalize_embeddings": True}
hf = HuggingFaceBgeEmbeddings(
    model_name=embedd_model, model_kwargs=embedd_kwargs, encode_kwargs=encode_kwargs
)

# Instantiate the ChatOllama
model = ChatOllama(model="mistral:instruct", temperature=0.2, callback_handler=AsyncIteratorCallbackHandler())

system_prompt = "AI: "

template = """
You are Poro, an AI designed to help humans. You provide short, concise answers to questions and messages.
This is a conversation between you and a human.
If you do not know the answer to a question, truthfully say it so.

YOU ONLY use information contained in the "Relevant Information" section and do not hallucinate.
YOU SHOULD NEVER ANSWER INSTEAD OF THE HUMAN? YOUR ANSWER SHOULD BE CONTAINED IN THE "AI:" PART ONLY.
NONE OF YOUR TEXT SHOULD CONTAIN "AI:" NOR "Human:".


Relevant Information:

{history}

Conversation:
Human: {input}
AI:"""
prompt = PromptTemplate(
    input_variables=["history", "input"], template=template
)

# Here it is by default set to "AI"
conversation = ConversationChain(
    llm=model, 
    verbose=True, 
    memory=ConversationBufferMemory(), 
    prompt=prompt,
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    query: str

async def run_call(query, stream_it):
    model.callbacks = [stream_it]
    response = await conversation.apredict(input=query)
    return response

async def create_gen(query, stream_it):
    task = asyncio.create_task(run_call(query, stream_it))
    async for token in stream_it.aiter():
        yield token
        print(token)
    await task

@app.post("/ai")
async def handle_ai_request(item: Item):
    try:
        print("Received message:", item.query)
        stream_it = AsyncIteratorCallbackHandler()
        gen = create_gen(item.query, stream_it)
        return StreamingResponse(gen, media_type="text/event-stream")
    except Exception as e:
        print(e)


if __name__ == "__main__":
    uvicorn.run(host="0.0.0.0", port=8000, app=app)
