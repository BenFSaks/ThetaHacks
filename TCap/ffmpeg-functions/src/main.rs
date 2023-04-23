use std::time::Duration;
use std::io::{Write, self};
use std::process::{Command, Stdio};
fn main() {
    println!("video=\"FaceTime HD Camera (Built-in)\":audio=\"Internal Digital Microphone (Apple Audio Device)\"");
    record_camera_screen(4).expect("didnt work");
}

fn record_camera_screen(time: u64) -> io::Result<()> {
    let vid = "video=\"FaceTime HD Camera (Built-in)\":audio=\"Internal Digital Microphone (Apple Audio Device)\"";
    //-f gdigrab -thread_queue_size 64 -framerate 30 -i desktop -f dshow -i video="FaceTime HD Camera (Built-in)":audio="Internal Digital Microphone (Apple Audio Device)" -filter_complex 'overlay' overlayed.mp4
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
        //.arg("video=\"FaceTime")
        // .arg("HD")
        // .arg("Camera")
        // .arg("(Built-in)\":audio=\"Internal")
        // .arg("Digital")
        // .arg("Microphone")
        // .arg("(Apple")
        // .arg("Audio")
        // .arg("Device)\"")

        .arg(vid)
        .arg("-filter_complex")
        .arg("'overlay'")
        .arg("overlayed.mp4")

        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .spawn()?;

    std::thread::sleep(Duration::from_secs(time+1));
    let record_stdin = record.stdin.as_mut().unwrap();
    record_stdin.write_all(b"q")?;
    drop(record_stdin);
    let output = record.wait_with_output()?;
    println!("output = {:?}", output);
    Ok(())
}
//ffmpeg -f dshow -i video="FaceTime HD Camera (Built-in)":audio="Internal Digital Microphone (Apple Audio Device)" out.mp4
//above command records my camera and audio nicely but it has a 4 second delay from the start 

// ffmepg -i basefile.wmv -vf "movie=secondfile.wmv scale=300:-1 [inner];[in][inner] overlay=10:10 [out]" overlay.mp4
//                                            scale changes size of video
//-f gdigrab -thread_queue_size 64 -framerate 30 -i desktop -f dshow -i video="FaceTime HD Camera (Built-in)":audio="Internal Digital Microphone (Apple Audio Device)" -filter_complex 'overlay' overlayed.mp4
// the above command captures screen and camera and audio and overlays the camera on the top left.
// I have no idea how to change a few things like where it is and how large the video is