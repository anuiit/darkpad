#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use serde::Deserialize;
use std::fs;
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, WindowEvent};

#[derive(Deserialize)]
struct FilePayload {
  path: String,
  contents: String,
}

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![open_file, save_file, save_file_as])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}

#[tauri::command]
fn open_file(path: String) -> Result<String, String> {
  fs::read_to_string(path).map_err(|e| e.to_string())
}

#[tauri::command]
fn save_file(payload: FilePayload) -> Result<(), String> {
  fs::write(payload.path, payload.contents).map_err(|e| e.to_string())
}

#[tauri::command]
fn save_file_as(contents: String) -> Result<String, String> {
  // Implement save file as logic, potentially using a file dialog.
  Ok("path/to/file".into())
}
