import Realistic from "react-canvas-confetti/dist/presets/realistic";

const Confetti = () => {
  console.log(Realistic);
  return (
    <>
      <Realistic
        autorun={{ speed: 0.7, duration: 2 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 9999,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </>
  );
};

export default Confetti;
