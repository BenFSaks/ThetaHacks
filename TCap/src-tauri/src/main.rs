// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


//TUARI COMMANDS 
#[tauri::command]
fn start_recording() {
println!("REC: In Progress");
}
#[tauri::command]
fn stop_recording() {
println!("REC: Stopped");
}

fn main() {
    tauri::Builder::default()
    
    //Invoke Functions 
    .invoke_handler(tauri::generate_handler![start_recording])
    
    //Tauri App Generator 
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
    
}