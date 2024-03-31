import { Box } from "@mui/material";
import userImage from '../../src/assets/images/young-beautiful-girl-posing-black-leather-jacket-park_1153-8104.jpg'
const UserImage = ({ image, size = {size} }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={userImage}
      />
    </Box>
  );
};

export default UserImage;