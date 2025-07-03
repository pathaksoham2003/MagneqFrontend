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

export const getIcon = (key) => {
  const iconMap = {
    create_order: HiOutlineArchiveBox,
    track_order: PiCubeDuotone,
    ledger: TbFileInvoice,
    quality: CgMenuBoxed,
    dashboard: HiOutlineSquares2X2,
    production: BsBox,
    purchase: IoDocumentTextOutline,
    store: FaRegRectangleList,
    chat: IoChatbubblesOutline,
    email: GoMail,
  };

  return iconMap[key] || HiOutlineArchiveBox; // default fallback
};
