import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { useNavigate } from "react-router-dom";

interface moviesData {
  moviename: string;
}

const SearchMovie = () => {
  let navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      moviename: "",
    },
  });

  let {
    mutate: searchMovie,
    data,
    status,
  } = useMutation({
    mutationFn: async ({ moviename }: moviesData) => {
      let { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/api/search?query=${moviename}`
      );
      return data;
    },
  });

  let movie = data?.data?.[0];

  return (
    <div>
      <div className="text-center text-4xl mt-4 font-bold ">Search Movie</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            searchMovie(data);
          })}
          className=" flex flex-row justify-center gap-10 mt-8"
        >
          <FormField
            control={form.control}
            name="moviename"
            render={({ field }) => (
              <FormItem>
                <FormControl className="w-[40rem]">
                  <Input placeholder="Search Movie" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" type="submit">
            Search
          </Button>
        </form>
      </Form>
      {movie ? (
        <div className="mt-20 flex flex-row justify-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{movie.moviename}</CardTitle>
              <CardDescription> Directed by {movie.director}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Released Year : {movie.year}</p>
              <p>Rating : {movie.rating}</p>
              <p>Language : {movie.language}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => navigate(`/update-movie/${movie._id}`)}
                variant="outline"
              >
                Update
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <>
          {status == "error" ? (
            <div className=" mt-20 text-red-500 flex flex-row justify-center items-center">
              <p>No Movie Found</p>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};
export default SearchMovie;
