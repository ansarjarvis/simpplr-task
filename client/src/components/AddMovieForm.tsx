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
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

interface moviesData {
  moviename: string;
  director: string;
  year: string;
  language: string;
  rating: string;
}

const AddMovieForm = () => {
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

  let { mutate: addMovie } = useMutation({
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

      let { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/movie`,
        payload
      );
      return data;
    },
    onSuccess: async () => {
      form.reset();
      toast({
        title: "Movie Successfully Added",
      });
      navigate("/");
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
        title: "Their was a problem",
        description: "Something went wrong , try again later",
        variant: "destructive",
      });
    },
  });
  return (
    <>
      <div className="text-center text-4xl mt-4 font-bold ">Add New Movie</div>

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
    </>
  );
};
export default AddMovieForm;
