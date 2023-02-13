import React from "react";
import { Add } from "@mui/icons-material";

import { Box, Stack, Typography } from "@pankod/refine-mui";
import { useList } from "@pankod/refine-core";
import { useNavigate } from "@pankod/refine-react-router-v6";

// import { PropertyCard, CustomButton } from "components";

const AllProperties = () => {
	const navigate = useNavigate();
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
			</Stack>
		</Box>
	);
};

export default AllProperties;
