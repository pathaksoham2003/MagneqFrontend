import {HiOutlineArchiveBox} from "react-icons/hi2";
import {PiCubeDuotone} from "react-icons/pi";
import {CgMenuBoxed} from "react-icons/cg";
import {TbFileInvoice} from "react-icons/tb";
import {IoChatbubblesOutline} from "react-icons/io5";
import {GoMail} from "react-icons/go";
import {HiOutlineSquares2X2} from "react-icons/hi2";
import {BsBox} from "react-icons/bs";
import {FaRegRectangleList} from "react-icons/fa6";
import {IoDocumentTextOutline} from "react-icons/io5";
import {PiGear} from "react-icons/pi";
import {FaRegUser} from "react-icons/fa";
import {BsHouseGear} from "react-icons/bs";
import {RiSubtractLine} from "react-icons/ri";

export const getIcon = (key) => {
  const iconMap = {
    create_order: HiOutlineArchiveBox,
    track_order: PiCubeDuotone,
    ledger: TbFileInvoice,
    quality: CgMenuBoxed,
    dashboard: HiOutlineSquares2X2,
    production: BsBox,
    purchase: IoDocumentTextOutline,
    store: HiOutlineArchiveBox,
    chat: IoChatbubblesOutline,
    email: GoMail,
    class_a: RiSubtractLine,
    class_b: RiSubtractLine,
    class_c: RiSubtractLine,
    raw_material: PiGear,
    manage_fg: BsHouseGear,
    manage_users: FaRegUser,
  };

  return iconMap[key] || HiOutlineArchiveBox; // default fallback
};
