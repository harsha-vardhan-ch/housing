import React from "react";
import { useState } from "react";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { useGetIdentity } from "@pankod/refine-core";
import Form from "components/common/Form";
const CreateProperty = () => {
	const navigate = useNavigate();
	const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  const {data:user} = useGetIdentity();
	const {
		refineCore: { onFinish, formLoading, queryResult },
		register,
		handleSubmit,
		resetField,
		formState: { errors },
	} = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setPropertyImage({ name: file?.name, url: result }));
  };
  
  const onFinishHandler = async (data: FieldValues) => {
    if(!propertyImage.name) return alert('Please select an image');
    
    await onFinish({ ...data, photo: propertyImage.url, email: user.email })
  };

	return ( 
  <Form 
    type="Create"
    register = { register }
    formLoading = { formLoading }
    propertyImage = { propertyImage }
    handleSubmit = { handleSubmit }
    handleImageChange = { handleImageChange }
    onFinish = { onFinish }
    onFinishHandler = { onFinishHandler }
  />);
};

export default CreateProperty;
