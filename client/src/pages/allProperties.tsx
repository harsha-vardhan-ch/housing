import React from "react";
import { Add } from "@mui/icons-material";

import {
	Box,
	Stack,
	Typography,
	TextField,
	Select,
	MenuItem,
} from "@pankod/refine-mui";

import { useTable } from "@pankod/refine-core";
import { useNavigate } from "@pankod/refine-react-router-v6";

import { PropertyCard, CustomButton } from "../components/components_index";
import { useMemo } from 'react';

const AllProperties = () => {
	const navigate = useNavigate();
	const {
		tableQueryResult: { data, isLoading, isError },
		current,
		setCurrent,
		sorter,
		setSorter,
		filters,
		setFilters,
		pageCount,
		setPageSize,
	} = useTable();
	

	const allProperties = data?.data ?? [];

  const currentPrice = sorter.find((item) => item.field === 'price')?.order || 'desc';

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }]);
  };

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => ('field' in item ? item : []));

    return {
      title: logicalFilters.find((item) => item.field === 'title')?.value || '',
      propertyType: logicalFilters.find((item) => item.field === 'propertyType')?.value || '',
    };
  }, [filters]);

	if (isLoading) return <Typography>Loading...</Typography>;
	if (isError) return <Typography>Error...</Typography>;

	return (
		<Box>
			<Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
				<Stack direction="column" width="100%">
					<Typography fontSize={25} fontWeight={700} color="#11142D">
						{!allProperties.length
							? "There are no properties"
							: "All Properties"}
					</Typography>
					<Box
						mb={2}
						mt={3}
						display="flex"
						width="84%"
						justifyContent="space-between"
						flexWrap="wrap"
					>
						<Box
							display="flex"
							gap={2}
							flexWrap="wrap"
							mb={{ xs: "20px", sm: 0 }}
						>
							<CustomButton
								title={`Sort price ${
									currentPrice === "asc" ? "↑" : "↓"
								}`}
								handleClick={() => toggleSort("price")}
								backgroundColor="#475BE8"
								color="#FCFCFC"
							/>
							<TextField
								variant="outlined"
								// color="info"
								color="secondary"
								focused
								placeholder="Search by title"
								value={currentFilterValues.title}
								onChange={(e) => {
									setFilters([
										{
											field: "title",
											operator: "contains",
											value: e.currentTarget.value
												? e.currentTarget.value
												: undefined,
										},
									]);
								}}
							/>
							<Select
								variant="outlined"
								color="secondary"
								displayEmpty
								required
								inputProps={{ "aria-label": "Without label" }}
								defaultValue=""
								value={currentFilterValues.propertyType}
								onChange={(e) =>
									setFilters(
										[
											{
												field: "propertyType",
												operator: "eq",
												value: e.target.value,
											},
										],
										"replace"
									)
								}
							>
								<MenuItem value="">All</MenuItem>
								{[
									"Apartment",
									"Villa",
									"Condos",
									"Townhouse",
									"Duplex",
									"Studio",
								].map((type) => (
									<MenuItem
										key={type}
										value={type.toLowerCase()}
									>
										{type}
									</MenuItem>
								))}
							</Select>
						</Box>
						{/* Add property */}
						<CustomButton
							title="Add Property"
							handleClick={() => navigate("/properties/create")}
							backgroundColor="#475BE8"
							color="#FCFCFC"
							icon={<Add />}
						/>
					</Box>
				</Stack>
				{/* Display all properties */}
				{allProperties?.map((property) => (
					<PropertyCard
						key={property._id}
						id={property._id}
						title={property.title}
						location={property.location}
						price={property.price}
						photo={property.photo}
					/>
				))}
			</Box>

			{/* Pagination */}

			{allProperties.length ? (
				<Box display="flex" gap={2} mt={3} flexWrap="wrap">
					<CustomButton
						title="Previous"
						handleClick={() => setCurrent((prev) => prev - 1)}
						backgroundColor="#475BE8"
						color="#FCFCFC"
						disabled={!(current > 1)}
					/>
					<Box
						display={{ xs: "hidden", sm: "flex" }}
						alignItems="center"
						gap="5px"
					>
						Page{" "}
						<strong>
							{" "}
							{current} of {pageCount}{" "}
						</strong>
					</Box>
					<CustomButton
						title="Next"
						handleClick={() => setCurrent((prev) => prev + 1)}
						backgroundColor="#475BE8"
						color="#FCFCFC"
						disabled={current === pageCount}
					/>
					<Select
						variant="outlined"
						color="info"
						displayEmpty
						required
						inputProps={{ "aria-label": "Without label" }}
						defaultValue={10}
						onChange={(e) =>
							setPageSize(
								e.target.value ? Number(e.target.value) : 10
							)
						}
					>
						{[10, 20, 30, 40, 50].map((size) => (
							<MenuItem key={size} value={size}>
								Show {size}
							</MenuItem>
						))}
					</Select>
				</Box>
			) : null}
		</Box>
	);
};

export default AllProperties;
