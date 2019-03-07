function cronjob(setting, task) {
  let timer;
  let time = setting.time;

  if (time === 'now') {
    time = 0;
  }

  function done() {
    if (timer) {
      clearTimeout(timer);
    }
  }

  timer = setTimeout(() => {
    task(done);
    cronjob({time}, task);
  }, time);
}
