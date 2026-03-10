import React, { useEffect, useRef } from 'react';

export const IntroAnimation: React.FC = () => {
  const cloudsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cloudsRef.current) {
      for (let i = 0; i < 18; i++) {
        const d = document.createElement('div');
        d.className = 'intro-cloud';
        const size = 40 + Math.random() * 80;
        d.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${size}px;height:${size*0.5}px;animation-delay:${Math.random()*6}s;animation-duration:${4+Math.random()*4}s`;
        cloudsRef.current.appendChild(d);
      }
    }
  }, []);

  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #4A90D9 0%, #7AB8E0 30%, #A8D4F0 60%, #D0E8F8 100%)' }}>
      <style>{`
        .intro-cloud{position:absolute;background:rgba(255,255,255,0.4);border-radius:50%;filter:blur(8px);opacity:0;animation:intro-drift 6s ease-in-out infinite}
        @keyframes intro-drift{0%,100%{opacity:0;transform:translateX(0)}25%{opacity:.5}50%{opacity:.6;transform:translateX(20px)}75%{opacity:.4}100%{opacity:0;transform:translateX(40px)}}

        .intro-fly-h{position:absolute;left:50%;top:22%;animation:intro-flyH 10s ease-in-out infinite}
        @keyframes intro-flyH{
          0%,100%{transform:translateX(-50%)}
          25%{transform:translateX(-50%) translateX(12vw)}
          75%{transform:translateX(-50%) translateX(-12vw)}
        }

        .intro-fly-v{animation:intro-flyV 7s ease-in-out infinite}
        @keyframes intro-flyV{
          0%,100%{transform:translateY(0)}
          30%{transform:translateY(-7vh)}
          60%{transform:translateY(4vh)}
        }

        .intro-fly-tilt{animation:intro-tilt 10s ease-in-out infinite}
        @keyframes intro-tilt{
          0%,100%{transform:rotate(0deg)}
          25%{transform:rotate(3deg)}
          50%{transform:rotate(0deg)}
          75%{transform:rotate(-3deg)}
        }

        .intro-client-logo{position:relative;display:inline-flex;align-items:center;justify-content:center}
        .intro-client-logo img.intro-logo-img{height:100px;width:auto;max-width:none;padding:16px 28px;background:white;border-radius:14px;
          border:2px solid rgba(91,214,117,.5);box-shadow:0 8px 32px rgba(0,0,0,.15)}

        .intro-wing-left,.intro-wing-right{position:absolute;top:50%;width:90px;height:68px}
        .intro-wing-left{right:100%;margin-right:-10px;transform-origin:100% 50%;animation:intro-flap-l .7s ease-in-out infinite}
        .intro-wing-right{left:100%;margin-left:-10px;transform-origin:0% 50%;animation:intro-flap-r .7s ease-in-out infinite}
        @keyframes intro-flap-l{0%,100%{transform:translateY(-50%) rotate(0deg) scaleY(1)}50%{transform:translateY(-50%) rotate(28deg) scaleY(.65)}}
        @keyframes intro-flap-r{0%,100%{transform:translateY(-50%) rotate(0deg) scaleY(1)}50%{transform:translateY(-50%) rotate(-28deg) scaleY(.65)}}

        .intro-perched-crow{position:absolute;top:-38px;left:50%;margin-left:-40px;width:80px;height:auto;transform-origin:bottom center;animation:intro-crowIdle 3s ease-in-out infinite}
        @keyframes intro-crowIdle{0%,100%{transform:rotate(0deg)}40%{transform:rotate(3deg)}70%{transform:rotate(-2deg)}}

        .intro-text-block{position:absolute;bottom:28%;left:0;right:0;text-align:center}
        .intro-text-block h1{font-size:clamp(1.5rem,3.8vw,2.6rem);font-weight:900;color:#1a0b2e;opacity:0;animation:intro-su .8s ease-out 1.5s forwards;line-height:1.3;text-shadow:0 2px 8px rgba(255,255,255,0.5)}
        .intro-text-block h1 span{color:#5bd675}
        @keyframes intro-su{from{opacity:0;transform:translateY(25px)}to{opacity:1;transform:translateY(0)}}

        .intro-logo-row{position:absolute;bottom:14%;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:18px;opacity:0;animation:intro-su .8s ease-out 2s forwards;white-space:nowrap}
        .intro-logo-pill{height:56px;background:white;border-radius:12px;padding:10px 20px;display:flex;align-items:center;box-shadow:0 4px 16px rgba(0,0,0,.1)}
        .intro-logo-pill img{height:100%;width:auto}
        .intro-x-mark{color:rgba(26,11,46,.4);font-size:1.4rem;font-weight:300}

        .intro-line{position:absolute;bottom:25%;left:50%;transform:translateX(-50%);width:0;height:3px;background:linear-gradient(90deg,transparent,#5bd675,transparent);animation:intro-linegrow .8s ease-out 1.3s forwards}
        @keyframes intro-linegrow{to{width:min(500px,60vw)}}
      `}</style>
      <div ref={cloudsRef} style={{ position: 'absolute', inset: 0 }} />
      <div className="intro-fly-h">
        <div className="intro-fly-v">
          <div className="intro-fly-tilt">
            <div className="intro-client-logo">
              <svg className="intro-wing-left" viewBox="0 0 80 60" fill="none"><path d="M80,30 Q60,0 20,5 Q40,20 50,30 Q40,40 20,55 Q60,60 80,30Z" fill="#111" fillOpacity=".9"/><path d="M80,30 Q65,8 30,10 Q48,22 55,30 Q48,38 30,50 Q65,52 80,30Z" fill="#222" fillOpacity=".5"/></svg>
              <img className="intro-logo-img" src="/placeholder-logo.svg" alt="Klant logo" />
              <svg className="intro-wing-right" viewBox="0 0 80 60" fill="none"><path d="M0,30 Q20,0 60,5 Q40,20 30,30 Q40,40 60,55 Q20,60 0,30Z" fill="#111" fillOpacity=".9"/><path d="M0,30 Q15,8 50,10 Q32,22 25,30 Q32,38 50,50 Q15,52 0,30Z" fill="#222" fillOpacity=".5"/></svg>
              <img className="intro-perched-crow" src="/zk-crow.png" alt="Zwarte Kraai" />
            </div>
          </div>
        </div>
      </div>
      <div className="intro-line" />
      <div className="intro-text-block">
        <h1>Wij geven jouw organisatie<br/><span>vleugels</span> om hoger te vliegen!</h1>
      </div>
      <div className="intro-logo-row">
        <div className="intro-logo-pill"><img src="/zk-logo-full.png" alt="ZK" /></div>
        <span className="intro-x-mark">&times;</span>
        <div className="intro-logo-pill"><img src="/placeholder-logo.svg" alt="Klant logo" /></div>
      </div>
    </section>
  );
};
