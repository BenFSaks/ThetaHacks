// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

//Imports
use tauri::{window::WindowBuilder, AppHandle, WindowUrl};

//TUARI COMMANDS 
#[tauri::command]
fn start_recording() {
println!("REC: In Progress");
}
#[tauri::command]
fn stop_recording() {
println!("REC: Stopped");
}
#[tauri::command]
async fn open_settings_window(app: AppHandle) -> Result<(), String> {
    let result = WindowBuilder::new(&app, "settings", WindowUrl::App("/src/Settings.tsx".into()))
        .fullscreen(false)
        .resizable(true)
        .title("Settings")
        .center()
        //.inner_size(800.0, 600.0)
        .build();
    match result {
        Ok(_) => {
            println!("Settings Window Created Successfully!");
            Ok(())
        }
        Err(err) => {
            println!("Failed to Create Settings Window {}", err);
            Err("Failed to create Window".to_string())
        }
    }
}



fn main() {
tauri::Builder::default()
    //Window Config via setup Hook
    // .setup(|app| {
    //     let new_window = tauri::WindowBuilder::new(
    //         app,
    //         "window", /* the unique window label */
    //         tauri::WindowUrl::App("window.html".into())
    //     ).build()?;
    //     Ok(())
    // })

    //Invoke Functions 
    .invoke_handler(tauri::generate_handler![start_recording])
    .invoke_handler(tauri::generate_handler![open_settings_window])
    
    //Tauri App Generator 
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
    
}