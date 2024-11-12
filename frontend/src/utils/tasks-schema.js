import * as yup from "yup";

export const create = yup.object().shape({
  title: yup
    .string()
    .trim()
    .max(100, "Title cannot exceed 100 characters.")
    .required("Title is required."),
  description: yup.string().trim().optional(),
  date: yup
    .date()
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Date must be today or later."
    )
    .required(),
  is_important: yup.boolean().required().default(false),
});

export const update = yup.object().shape({
  title: yup
    .string()
    .trim()
    .max(100, "Title cannot exceed 100 characters.")
    .required("Title is required."),
  description: yup.string().trim().optional(),
  date: yup.date().required(),
  is_important: yup.boolean().required().default(false),
});
