use std::time::Duration;
use std::io::{Write, self};
use std::process::{Command, Stdio};
use std::path::Path;
fn main() {
    println!("{}", file_exists("/Users/peter"));
    println!("{}", no_file_tagged("av"));
}

fn file_exists(path: &str) -> bool {
    Path::new(path).exists()
}

fn no_file_tagged(path: &str) -> bool {
    if  path.contains(".avi") ||
        path.contains(".mov") ||
        path.contains(".mp4") ||
        path.contains(".wmv") ||
        path.contains(".mkv") ||
        path.contains(".WebM") {
            return true;
        }
    return false 

}
// this function will return a vector of strings that are the names of the dshow devices
fn get_dshow_devices() -> Vec<String> {


    let mut list = Command::new("ffmpeg")
        .arg("-list_devices")
        .arg("true")
        .arg("-f")
        .arg("dshow")
        .arg("-i")
        .arg("dummy")
        .stdout(Stdio::piped())
        .output()
        .unwrap();
        // this command lists all the dshow devices and captures its output

    // convert output of command into a string
    let stdout = String::from_utf8(list.stderr).unwrap();

    // parse the string into strings surrounded by quotes
    let mut words = stdout.split("\"");

    // create a vector of strings that will hold the names of the devices
    let mut devices:Vec<String> = Vec::new();
    for word in words.clone() {
        if word.contains(" (video)")
            || word.contains(" (audio")
            || word.contains("dshow")
            || word.contains("dummy")
            || word.contains("@device")
        {
            continue;
        }
        devices.push(word.to_string());
    }

    // return the devices;
    devices
}




fn record_camera_screen(time: u64, video: &String, audio: &String) {

    // we format the video and audio strings into the format that ffmpeg wants
    let mut vid = "video=".to_owned();
    vid.push_str(video);
    vid.push_str(":");
    vid.push_str("audio=");
    vid.push_str(audio);

    // this is the command that will be executed
    // to record screen, camera and mic
    let mut record = Command::new("ffmpeg")

        .arg("-f")
        .arg("gdigrab")
        .arg("-thread_queue_size")
        .arg("64")
        .arg("-framerate")
        .arg("30")
        .arg("-i")
        .arg("desktop")
        .arg("-f")
        .arg("dshow")
        .arg("-i")
        .arg(vid)
        .arg("-filter_complex")
        .arg("'overlay'")
        .arg("overlayed.mp4")

        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .spawn().unwrap();


    //record for time amount of seconds
    //+1 is because it stops the recording a second early for some reason
    std::thread::sleep(Duration::from_secs(time+1));

    // send a q to the stdin of the ffmpeg process to stop recording
    let record_stdin = record.stdin.as_mut().unwrap();
    record_stdin.write_all(b"q").expect("failed to write to stdin");
 }
