import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useToast } from "./ui/use-toast";

import { useNavigate } from "react-router-dom";

interface Movie {
  _id: string;
  moviename: string;
  director: string;
  year: string;
  language: string;
  rating: string;
}

interface moviesData {
  moviename: string;
  director: string;
  year: string;
  language: string;
  rating: string;
}

const FilterMovie = () => {
  let navigate = useNavigate();
  let { toast } = useToast();
  const form = useForm({
    defaultValues: {
      moviename: "",
      director: "",
      year: "",
      language: "",
      rating: "",
    },
  });

  let {
    mutate: filterMovies,
    data,
    status,
  } = useMutation<Movie[], unknown, moviesData>({
    mutationFn: async ({
      moviename,
      director,
      language,
      rating,
      year,
    }: moviesData) => {
      let filters = {
        moviename,
        director,
        language,
        rating,
        year,
      };
      let { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/filter`,
        { params: filters }
      );
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error);
        if (error?.response?.status === 500) {
          return toast({
            title: error.response.data.error,
            variant: "destructive",
          });
        }
      }
      return toast({
        title: "No movie found with this query",

        variant: "destructive",
      });
    },
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            filterMovies(data);
          })}
          className=" flex flex-col justify-center items-center gap-10 mt-8"
        >
          <FormField
            control={form.control}
            name="moviename"
            render={({ field }) => (
              <FormItem>
                <FormControl className="w-[40rem]">
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="director"
            render={({ field }) => (
              <FormItem>
                <FormControl className="w-[40rem]">
                  <Input placeholder="Director" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormControl className="w-[40rem]">
                  <Input placeholder="Year" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormControl className="w-[40rem]">
                  <Input placeholder="Language" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormControl className="w-[40rem]">
                  <Input placeholder="Rating" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" type="submit">
            Filter
          </Button>
        </form>
      </Form>

      {status == "error" ? (
        <div className="text-red-500 text-center mt-20">No movie found</div>
      ) : (
        <></>
      )}

      {data && (
        <div className="text-green-500 mx-6"> Movies found: {data?.length}</div>
      )}

      <div className="flex flex-wrap gap-2 mt-4 mx-6">
        {data?.map((movie) => (
          <Card key={movie._id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{movie.moviename}</CardTitle>
              <CardDescription> Directed by {movie.director}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Released Year: {movie.year}</p>
              <p>Rating: {movie.rating}</p>
              <p>Language: {movie.language}</p>
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
        ))}
      </div>
    </div>
  );
};
export default FilterMovie;
