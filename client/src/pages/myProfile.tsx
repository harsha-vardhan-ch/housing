import { useGetIdentity, useOne } from "@pankod/refine-core";
import Profile from "components/common/Profile";
const MyProfile = () => {
	const { data: user } = useGetIdentity();
	const { data, isLoading, isError } = useOne({
		resource: "users",
		id: user?.userid,
	});
	const currentProfile = data?.data;
	console.log(currentProfile);
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>error...</div>;
	return currentProfile ? (
		<Profile
			type="My"
			name={currentProfile.name}
			email={currentProfile.email}
			avatar={currentProfile.avatar}
			properties={currentProfile.allProperties || []}
		/>
	) : null;
};
export default MyProfile;