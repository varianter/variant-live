import p5 from "./p5";

import ibmFont from "../assets/IBMPlexMono-Bold.ttf";

const noop = () => {};

export default function createEnv(
  { preload = noop, setup = noop, render = noop },
  metadata,
  el
) {
  let p5Instance = new p5(env, el);
  let preloadHook = noop;
  let setupHook = noop;

  return {
    updateValues(opts) {
      const {
        render: innerRender = noop,
        metadata: innerMetadata = {},
        preloadHook: preloadHookInner = noop,
        setupHook: setupHookInner = noop
      } = opts;

      render = innerRender;
      metadata = innerMetadata;
      preloadHook = preloadHookInner;
      setupHook = setupHookInner;
    },
    p5Instance
  };

  function env(p) {
    let fft, analyzer, source, myFont;
    let preloadResult;
    let setupResult;

    p.preload = () => {
      myFont = p.loadFont(ibmFont);

      source = preload(p, p5);
      preloadResult = preloadHook(p, p5);
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

      fft = new p5.FFT();
      fft.setInput(source);

      analyzer = new p5.Amplitude();

      setupResult = setupHook(p, preloadResult, {
        fft,
        analyzer,
        p5
      });

      setup(p);
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
      p.background("#000");
      p.textFont(myFont);
      p.noFill();
      fft.analyze();

      try {
        p.push();
        render(
          p,
          {
            bass: fft.getEnergy("bass"),
            treble: fft.getEnergy("treble"),
            mid: fft.getEnergy("mid"),
            level: analyzer.getLevel(),
            p5
          },
          setupResult
        );
        p.pop();

        renderAttribution(p);
      } catch (ex) {
        console.error(ex.message);
      }
    };

    function renderAttribution(p) {
      if (!metadata || !metadata.creators || !Array.isArray(metadata.creators))
        return;

      p.push();
      p.translate(-p.windowWidth / 2, p.windowHeight / 2 - 80);
      p.textSize(40);
      p.fill("#fff");
      p.text(metadata.creators.join(" & "), 20, 0);

      if (metadata.url) {
        p.textSize(26);
        p.text(metadata.url, 20, 40);
      }
      p.pop();
    }
  }
}
