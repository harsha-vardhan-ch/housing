import React from "react";
import { Add } from "@mui/icons-material";

import { Box, Stack, Typography } from "@pankod/refine-mui";
import { useTable } from "@pankod/refine-core";
import { useNavigate } from "@pankod/refine-react-router-v6";

import { PropertyCard, CustomButton } from "../components/components_index";

const AllProperties = () => {
	const navigate = useNavigate();
	const {
		tableQueryResult: { data, isLoading, isError}
	} = useTable();
	console.log(data);

	const allProperties = data?.data??[]
	if(isLoading) return <Typography>Loading...</Typography>
	if(isError) return <Typography>Error...</Typography>

	return (
		<Box>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Typography fontSize={25} fontWeight={700} color="#11142D">
					Properties
				</Typography>
				<CustomButton
					title="Add Property"
					handleClick={() => navigate("/properties/create")}
					backgroundColor="#475be8"
					color="#fcfcfc"
					icon={<Add />}
				/>
			</Stack>
			<Box mt="20px" sx={{ display: "flex", flexWrap: 'wrap', gap: 3 }}>
				{
					allProperties.map((property) =>(
						<PropertyCard 
							key = {property._id}
							id = {property._id}
							title = {property.title}
							price = {property.price}
							photo = {property.photo}
							location = {property.location}
						
						/>
					))
				}
			</Box>
		</Box>
	);
};

export default AllProperties;
