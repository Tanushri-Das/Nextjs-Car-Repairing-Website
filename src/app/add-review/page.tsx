"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Review } from "@/types";
import Container from "@/components/Container";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";

const img_hosting_token = process.env.NEXT_PUBLIC_Image_Upload_token;
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

const AddReview: React.FC = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Review>();

  const reviewMutation = useMutation({
    mutationFn: (newReview: Review) => {
      return axios.post("/api/reviews", newReview);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Your review has been submitted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "There was an issue submitting your review.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    },
  });

  const onSubmit: SubmitHandler<Review> = async (data) => {
    // Create form data for image upload
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      // Upload image to imgbb
      const res = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });
      const imgResponse = await res.json();

      if (imgResponse.success) {
        const imgURL = imgResponse.data.display_url;

        // Prepare the review data
        const { name, email, designation, rating, description } = data;
        const newReview = {
          name,
          email,
          designation,
          rating,
          description,
          image: imgURL,
        };
        // Submit the review
        reviewMutation.mutate(newReview);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Image upload failed.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an issue uploading the image.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <Container className="mt-12">
      <h1 className="text-4xl text-center font-bold mb-4">Add Review</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mt-10 max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              defaultValue={session?.user?.name || ""}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-3"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
              Email
            </label>
            <input
              type="text"
              {...register("email", { required: true })}
              defaultValue={session?.user?.email || ""}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-3"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
              Designation
            </label>
            <input
              type="text"
              {...register("designation", { required: true })}
              placeholder="Designation"
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-3"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
              Rate Us
            </label>
            <select
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-[14.5px]"
              {...register("rating", { required: true })}
            >
              <option>1</option>
              <option>2</option>
              <option>2.5</option>
              <option>3</option>
              <option>3.5</option>
              <option>4</option>
              <option>4.5</option>
              <option>5</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
            Image *
          </label>
          <input
            type="file"
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-3"
            {...register("image", { required: true })}
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
            Description
          </label>
          <textarea
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-3 h-24"
            placeholder="Review in detail"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex justify-center">
          <Button className="bg-[#FF3811] text-[20px] text-white font-semibold py-3 rounded-md w-full cursor-pointer outline-none">
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AddReview;
