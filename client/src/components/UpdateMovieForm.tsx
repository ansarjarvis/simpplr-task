import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "./ui/use-toast";

interface moviesData {
  moviename: string;
  director: string;
  year: string;
  language: string;
  rating: string;
}

interface Movie {
  _id: string;
  moviename: string;
  director: string;
  language: string;
  rating: string;
  year: string;
  __v: number;
}

interface FoundMoviesData {
  foundMovie: Movie;
}

const UpdateMovieForm = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let { toast } = useToast();

  /* for fetching movie */

  let { data } = useQuery<FoundMoviesData, Error>({
    queryKey: ["moviesData", id],
    queryFn: async () => {
      let { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/movie/${id}`
      );

      return data;
    },
  });

  /* updating movie */

  const form = useForm({
    defaultValues: {
      moviename: "",
      director: "",
      year: "",
      language: "",
      rating: "",
    },
  });

  useEffect(() => {
    if (data?.foundMovie) {
      form.reset({
        moviename: data.foundMovie.moviename,
        director: data.foundMovie.director,
        year: data.foundMovie.year,
        language: data.foundMovie.language,
        rating: data.foundMovie.rating,
      });
    }
  }, [data, form]);

  let { mutate: addMovie } = useMutation<void, Error, moviesData>({
    mutationFn: async ({
      moviename,
      director,
      year,
      language,
      rating,
    }: moviesData) => {
      let payload = {
        moviename,
        director,
        year,
        language,
        rating,
      };

      let { data } = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/movie/${id}`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "Movie Successfully Updated",
      });
      navigate("/");
    },
    onError: (error) => {
      console.error("Error updating movie:", error);
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => addMovie(data))}
        className="space-y-8 w-80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <FormField
          control={form.control}
          name="moviename"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Movie Name</FormLabel>
              <FormControl>
                <Input placeholder="Movie Name" {...field} />
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
              <FormLabel>Director Name</FormLabel>
              <FormControl>
                <Input placeholder="Director Name" {...field} />
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
              <FormLabel>Release Year</FormLabel>
              <FormControl>
                <Input placeholder="Release Year" {...field} />
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
              <FormLabel>Language</FormLabel>
              <FormControl>
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
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input placeholder="Rating" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default UpdateMovieForm;
