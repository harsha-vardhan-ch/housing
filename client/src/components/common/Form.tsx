import React from "react";
import { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";
import {
	Box,
	Typography,
	FormControl,
	FormHelperText,
	TextField,
	TextareaAutosize,
	Stack,
	Select,
	MenuItem,
	Button,
} from "@pankod/refine-mui";

const Form = ({
	type,
	register,
	propertyImage,
	formLoading,
	handleSubmit,
	handleImageChange,
	onFinish,
	onFinishHandler,
}: FormProps) => {
	return (
		<Box>
			<Typography fontSize={25} fontWeight={600} color="#11142d">
				{type} a Property
			</Typography>
			<Box mt={2.5} borderRadius="15px" padding="20px">
				<form
					style={{
						marginTop: "20px",
						width: "100%",
						display: "flex",
						flexDirection: "column",
						gap: "20px",
					}}
					onSubmit={handleSubmit(onFinishHandler)}
				>
					<FormControl>
						<FormHelperText
							sx={{
								fontWeight: 500,
								margin: "10px",
								fontSize: 16,
								color: "#11142d",
							}}
						>
							Enter Property Name
						</FormHelperText>
						<TextField
							fullWidth
							required
							id="outlined-basic"
							color="info"
							variant="outlined"
							{...register("title", { required: true })}
						/>
					</FormControl>
					<FormControl>
						<FormHelperText
							sx={{
								fontWeight: 500,
								margin: "10px",
								fontSize: 16,
								color: "#11142d",
							}}
						>
							Enter Description
						</FormHelperText>
						<TextareaAutosize
							minRows={5}
							required
							placeholder="Write Description"
							color="info"
							style={{
								width: "100%",
								background: "transparent",
								fontSize: "16px",
								borderColor: "rgba(0,0,0,0.23)",
								borderRadius: 6,
								padding: 10,
								color: "#919191",
							}}
							{...register("description", { required: true })}
						/>
					</FormControl>
					<Stack direction="row" gap={4}>
						<FormControl sx={{ flex: 1 }}>
							<FormHelperText
								sx={{
									fontWeight: 500,
									margin: "10px",
									fontSize: 16,
									color: "#11142d",
								}}
							>
								Select Property Type
							</FormHelperText>
							<Select
								variant="outlined"
								color="info"
								displayEmpty
								required
								defaultValue="Apartment"
								inputProps={{ "aria-label": "Without label" }}
								{...register("propertyType", {
									required: true,
								})}
							>
								<MenuItem value="Apartment">Apartment</MenuItem>
								<MenuItem value="Villa">Villa</MenuItem>
								<MenuItem value="IndependentHouse">
									Independent House
								</MenuItem>
								<MenuItem value="Studio">Studio</MenuItem>
							</Select>
						</FormControl>
						<FormControl>
							<FormHelperText
								sx={{
									fontWeight: 500,
									margin: "10px",
									fontSize: 16,
									color: "#11142d",
								}}
							>
								Enter Rent Price
							</FormHelperText>
							<TextField
								fullWidth
								required
								id="outlined-basic"
								color="info"
								variant="outlined"
								type="number"
								{...register("price", { required: true })}
							/>
						</FormControl>
					</Stack>
					<FormControl>
						<FormHelperText
							sx={{
								fontWeight: 500,
								margin: "10px",
								fontSize: 16,
								color: "#11142d",
							}}
						>
							Enter Location
						</FormHelperText>
						<TextField
							fullWidth
							required
							id="outlined-basic"
							color="info"
							variant="outlined"
							{...register("location", { required: true })}
						/>
					</FormControl>
					<Stack
						direction="column"
						gap={1}
						justifyContent="center"
						mb={2}
					>
						<Stack direction="row" gap={2}>
							<Typography
								color="#11142d"
								fontSize={16}
								fontWeight={500}
								my="10px"
							>
								Property Photo
							</Typography>
							<Button>
								Upload
								<input type="file" hidden accept="image/*"/>
							</Button>
						</Stack>
            <Typography fontSize={14} color="" sx={{wordBreak: 'break-all'}}>{propertyImage?.name}</Typography>
					</Stack>
          <CustomButton type="submit" title={ formLoading? 'Submitting': 'Submit'} backgroundColor="#475be8" color="#fcfcfc"/>
				</form>
			</Box>
		</Box>
	);
};

export default Form;
