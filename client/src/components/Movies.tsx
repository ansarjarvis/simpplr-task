import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface Movie {
  _id: string;
  moviename: string;
  director: string;
  language: string;
  rating: string;
  year: string;
  __v: number;
}

interface MoviesData {
  foundMovie: Movie[];
}

/* fetching all movie */

const Movies = () => {
  let navigate = useNavigate();
  let { toast } = useToast();
  let { data, refetch, isLoading, isError } = useQuery<MoviesData>({
    queryKey: ["moviesData"],
    queryFn: async () => {
      let { data } = await axios.get<MoviesData>(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/movie`
      );
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, data]);

  /* deleting movie */

  let { mutate: deleteMovie } = useMutation({
    mutationFn: async (id: string) => {
      let { data } = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/movie/${id}`
      );
      return data;
    },

    onSuccess: () => {
      toast({
        title: "Movie Successfully Deleted",
        variant: "destructive",
      });
      refetch();
    },
  });

  if (isLoading) {
    return (
      <div className=" mt-4 flex flex-row justify-center">
        <Button className="mx-6" disabled variant={"ghost"}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </Button>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (data?.foundMovie.length === 0) {
    return (
      <>
        <div className=" text-center text-red-600 mt-6 font-bold text-3xl">
          <div>No Movie Exist, Add to See Here</div>
          <Button className="mt-8" variant="link">
            <Link className="text-green-500" to="/add-movie">
              Add Movie
            </Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="text-center text-4xl mt-4 font-bold ">All Movies</div>
      <div className="mx-6 mt-20 flex flex-wrap gap-4">
        {data?.foundMovie?.map((movie) => (
          <Card key={movie._id} className="w-[350px]">
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
              <Button
                onClick={() => {
                  deleteMovie(movie._id);
                }}
                variant="destructive"
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Movies;
