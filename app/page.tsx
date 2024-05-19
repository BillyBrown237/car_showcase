import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constant";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";

const Home = async ({ generateStaticParams }: HomeProps) => {
  const allCars = await fetchCars({
    manufacturer: generateStaticParams?.manufacturer || "",
    year: generateStaticParams?.year || 2022,
    fuel: generateStaticParams?.fuel || "",
    limit: generateStaticParams?.limit || 10,
    model: generateStaticParams?.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(generateStaticParams.limit || 10) / 10}
              isNext={(generateStaticParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
