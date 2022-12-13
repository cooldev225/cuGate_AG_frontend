import React from "react";
import SearchIcon from "./svg/search";
import UsersIcon from "./svg/users";
import MoreIcon from "./svg/more";
import MapIcon from "./svg/map";
import PlusIcon from "./svg/plus";
import SocialIcon from "./svg/social";
import DotMoreVerticalIcon from "./svg/dot-more-vertical";
import DotMoreHorizontalIcon from "./svg/dot-more-horizontal";
import ChatIcon from "./svg/chat";
import message from "./svg/message";
import edit from "./svg/edit";
import slack from "./svg/slack";
import play from "./svg/play";
import photo from "./svg/photo";
import google from "./svg/google";
import twitter from "./svg/twitter";
import reddit from "./svg/reddit";
import linkedin from "./svg/linkedin";
import facebook from "./svg/facebook";
import instagram from "./svg/instagram";
import loading from "./svg/loading";
import close from "./svg/close";
import arrow_up from "./svg/arrow-up";
import arrow_down from "./svg/arrow-down";
export const Icon: React.FC<IconProps> = ({
  name = "",
  color = "currentColor",
  width,
}) => {
  return React.createElement(
    name === "search"? SearchIcon:
    name === "users"? UsersIcon:
    name === "more"? MoreIcon:
    name === "map"? MapIcon:
    name === "plus"? PlusIcon:
    name === "social"? SocialIcon:
    name === "social"? DotMoreVerticalIcon:
    name === "social"? DotMoreHorizontalIcon:
    name === "social"? ChatIcon:
    name === "social"? message:
    name === "social"? edit:
    name === "social"? slack:
    name === "social"? play:
    name === "social"? photo:
    name === "social"? google:
    name === "social"? twitter:
    name === "social"? reddit:
    name === "social"? linkedin:
    name === "social"? facebook:
    name === "social"? instagram:
    name === "loading"? loading:
    name === "close"? close:
    name === "arrow-up"? arrow_up:
    name === "arrow-down"? arrow_down:
    SearchIcon, { color, width }) || null;
};