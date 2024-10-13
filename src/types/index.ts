export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export type Facility = {
  name: string;
  details: string;
};
export type Service = {
  _id: string;
  service_id: string;
  title: string;
  img: string;
  price: string;
  description: string;
  facility: Facility[];
};
export type Team = {
  _id: string;
  title: string;
  image: string;
  designation: string;
};
export type Review = {
  _id?: string;
  name: string;
  email: string;
  designation: string;
  rating: number;
  description: string;
  image: string;
};

export type NewBooking = {
  email: string;
  name: string;
  countryCode: string;
  phone: string;
  date: string;
  serviceName: string;
  serviceImage: string;
  serviceID: string;
  price: number;
  address: string;
};
export type Booking = {
  _id: string;
  email: string;
  name: string;
  countryCode: string;
  phone: string;
  date: string;
  serviceName: string;
  serviceImage: string;
  serviceID: string;
  price: number;
  address: string;
};
// Define the response type for the API
export type BookingResponse = {
  message: string;
  response: Booking;
};
export type FormData = {
  name: string;
  date: string;
  email: string;
  price: string | number;
  address: string;
  phone: string;
  countryCode: string;
};
export type Contact = {
  name: string;
  email: string;
  address: string;
  phone: string;
  countryCode: string;
  message: string;
};
export type Faq = {
  question: string;
  answer: string;
};
