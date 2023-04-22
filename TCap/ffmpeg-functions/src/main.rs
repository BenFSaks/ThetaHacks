use std::process::Command;
use std::time::Duration;
fn main() {
    let mut record = Command::new("ffmpeg");
    record.arg("-f").arg("gdigrab").arg("-i").arg("desktop").arg("out.wmv");
    let mut s = record.spawn();
    let sleep = Duration::from_secs(7);
    std::thread::sleep(sleep);
    s.expect("He").kill().expect("cant kill it");
}

fn record_camera_screen() {
    println!("recording");
}
//ffmpeg -f dshow -i video="FaceTime HD Camera (Built-in)":audio="Internal Digital Microphone (Apple Audio Device)" out.mp4
//above command records my camera and audio nicely but it has a 4 second delay from the start 

// ffmepg -i basefile.wmv -vf "movie=secondfile.wmv scale=300:-1 [inner];[in][inner] overlay=10:10 [out]" overlay.mp4
//                                            scale changes size of video
//-f gdigrab -thread_queue_size 64 -framerate 30 -i desktop -f dshow -i video="FaceTime HD Camera (Built-in)":audio="Internal Digital Microphone (Apple Audio Device)" -filter_complex 'overlay' overlayed.mp4
// the above command captures screen and camera and audio and overlays the camera on the top left.
// I have no idea how to change a few things like where it is and how large the video is