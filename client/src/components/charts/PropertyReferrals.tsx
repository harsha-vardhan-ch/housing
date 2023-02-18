import React from "react";
import { borderRadius, Box, Stack, Typography } from "@pankod/refine-mui";
import { propertyReferralsInfo } from "constants/index";

interface ProgressBarOptions {
	title: string;
	percentage: number;
	color: string;
}
const ProgressBar = ({ title, percentage, color }: ProgressBarOptions) => (
	<Box width="100%">
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="space-between"
		>
			<Typography fontSize={16} fontWeight={500} color="#11142d">
				{title}
			</Typography>
			<Typography fontSize={16} fontWeight={500} color="#11142d">
				{percentage}%
			</Typography>
		</Stack>
		<Box
			mt={2}
			position="relative"
			width="100%"
			height="8px"
			borderRadius={1}
			bgcolor="#e4e8ef"
		>
			<Box
				width={`${percentage}%`}
				height="100%"
				borderRadius={1}
				position="absolute"
				bgcolor={color}
			/>
		</Box>
	</Box>
);
const PropertyReferrals = () => {
	return (
		<Box
			p={4}
			bgcolor="#fcfcfc"
			id="chart"
			display="flex"
			flexDirection="column"
			borderRadius="15px"
			minWidth={490}
		>
			<Stack fontSize={14} color="#11142d" fontWeight={600}>
				<Typography fontSize={18} fontWeight={600} color="#11142d">
					Property Referrals
				</Typography>
			</Stack>
			<Stack direction="column" gap="4" my="20px">
				{propertyReferralsInfo.map((bar) => (
					<ProgressBar key={bar.title} {...bar} />
				))}
			</Stack>
		</Box>
	);
};

export default PropertyReferrals;
