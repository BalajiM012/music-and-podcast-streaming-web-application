export const drawFrequencyBars = (ctx, analyser, width, height) => {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, width, height);

  const barWidth = width / bufferLength;

  for (let i = 0; i < bufferLength; i++) {
    const value = dataArray[i];
    const barHeight = value * 1.2;

    ctx.fillStyle = `hsl(${i * 2}, 100%, 60%)`;
    ctx.fillRect(
      i * barWidth,
      height - barHeight,
      barWidth - 1,
      barHeight
    );
  }
};

export const drawWaveform = (ctx, analyser, width, height) => {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  analyser.getByteTimeDomainData(dataArray);

  ctx.clearRect(0, 0, width, height);

  ctx.beginPath();
  ctx.strokeStyle = "#00ffff";
  ctx.lineWidth = 2;

  const sliceWidth = width / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * height) / 2;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);

    x += sliceWidth;
  }

  ctx.lineTo(width, height / 2);
  ctx.stroke();
};
