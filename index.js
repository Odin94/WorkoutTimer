const player = require('play-sound')(opts = {});
const click_sound = 'click.mp3';
const click_clack_sound = 'click_clack.mp3';

const error_handler = (err) => { if (err) console.log(err); }
const play_click_clack = async () => { player.play(click_clack_sound, error_handler); }
const play_click = async () => { player.play(click_sound, error_handler); }

const get_delta = (start_time_ms) => {
    const delta = new Date().getMilliseconds() - start_time_ms;
    console.log(delta);
    if (delta < 0) return 0;
    return delta;
}

const sleep = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

(async () => {
    let i = 0;
    const one_second = 1000;
    while (true) {
        const start_time_ms = new Date().getMilliseconds();
        i += 1;

        if (i % 10 == 0) {
            play_click_clack();
            const minutes = Math.floor(i / 60);
            const seconds = i - (minutes * 60);
            console.log(minutes + "." + seconds);
        } else {
            play_click();
        }

        const delta = get_delta(start_time_ms);
        await sleep(one_second - delta);
    }
})();
