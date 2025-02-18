const Home = () => {
  return (
    <section className="w-full h-screen bg-[url('/home-img.jpg')] bg-cover bg-no-repeat">
      <div className="w-full h-5/6 flex flex-col justify-center items-center relative pb-20 gap-10 text-white">
        <h1 className="w-full text-center text-7xl font-bold md:text-center tracking-wider z-0 mx-auto">Convertimos tus celebraciones en momentos únicos</h1>
        <p className="w-full text-center font-semibold">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam aliquam quidem, illo hic ex temporibus saepe voluptates maxime ad beatae eum praesentium tenetur! Alias, quis soluta laborum fuga rerum officiis.</p>
        <button className="bg-[#AA9A45] px-30 py-8 rounded-full font-bold">Cotiza tu evento</button>
      </div>
    </section>
  );
};

export default Home;
