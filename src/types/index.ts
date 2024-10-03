export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
type Facility = {
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
  _id: string;
  name: string;
  email: string;
  designation: string;
  rating: string;
  description: string;
  image: string;
};
