use std::process::Command;
use std::time::Duration;
fn main() {
    record_camera_screen();
}

fn record_camera_screen() {
    let mut record = Command::new("ffmpeg");
    record.arg("-f").arg("gdigrab").arg("-i").arg("desktop").arg("out.mp4").output();
   // record.arg("-f").arg("gdigrab").arg("-thread_queue_size").arg("64").arg("-framerate").arg("30").arg("-i").arg("desktop").arg("-f").arg("dshow").arg("-i").arg("video=\"FaceTime HD Camera (Built-in)\":audio=\"Internal Digital Microphone (Apple Audio Device)\"").arg("-filter_complex").arg("overlay").arg("overlayed.mp4");
    let sleep = Duration::from_secs(5);
    std::thread::sleep(sleep);
    println!("stop recording");
    record.arg("q").output().expect("failed to execute process").;
}
//ffmpeg -f dshow -i video="FaceTime HD Camera (Built-in)":audio="Internal Digital Microphone (Apple Audio Device)" out.mp4
//above command records my camera and audio nicely but it has a 4 second delay from the start 

// ffmepg -i basefile.wmv -vf "movie=secondfile.wmv scale=300:-1 [inner];[in][inner] overlay=10:10 [out]" overlay.mp4
//                                            scale changes size of video
//-f gdigrab -thread_queue_size 64 -framerate 30 -i desktop -f dshow -i video="FaceTime HD Camera (Built-in)":audio="Internal Digital Microphone (Apple Audio Device)" -filter_complex 'overlay' overlayed.mp4
// the above command captures screen and camera and audio and overlays the camera on the top left.
// I have no idea how to change a few things like where it is and how large the video is