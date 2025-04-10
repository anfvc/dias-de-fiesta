import Realistic from "react-canvas-confetti/dist/presets/realistic";

const Confetti = () => {
  console.log(Realistic);
  return (
    <>
      <Realistic
        autorun={{ speed: 0.2, duration: 2 }}
        style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
      />
    </>
  );
};

export default Confetti;
