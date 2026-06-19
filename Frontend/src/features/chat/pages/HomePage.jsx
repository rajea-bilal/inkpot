import React, { useEffect } from "react";
import Chip from "../components/Chip";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatId } from "../chat.slice";
import {
  ZapIcon,
  PlayCircleIcon,
  SearchIcon,
  MailIcon,
} from "../components/Icons";
import { useNavigate } from "react-router";

import { useChat } from "../hooks/useChat";

const HomePage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { chats } = useSelector((state) => state.chat);

  // const [chats, setChats] = useState();
  const { handleGetChats, fetchChatMessages } = useChat();

  console.log("chats :", chats);

  const recentConversations = Object.values(chats)
    .map((chat) => {
      return {
        ...chat,
        updatedAt: new Date(chat.updatedAt),
      };
    })
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 3);

  console.log("recentConversations:", recentConversations);

  const handleAddNewChat = () => {
    console.log("handle add new chat ran from Homepage");
    dispatch(setCurrentChatId(null));
    navigate("/chat");
  };

  const handleChatClick = (chatId) => {
    console.log(
      "handleChatClick function rang and chatId was received:",
      chatId,
    );
    dispatch(setCurrentChatId(chatId));
    fetchChatMessages(chatId);
    navigate("chat");
  };
  const firstname = user.user?.split(" ")[0];

  // Each button has a unique key, an icon, a label, and whether it's the primary (dark) button
  const actionButtons = [
    {
      key: "start",
      icon: <PlayCircleIcon />,
      label: "Start Chat",
      primary: true,
      action: handleAddNewChat,
    },
    {
      key: "research",
      icon: <SearchIcon />,
      label: "Run Research",
      primary: false,
    },
    {
      key: "email",
      icon: <MailIcon />,
      label: "Compose Email",
      primary: false,
    },
  ];

  // Styles shared by every button
  const baseButtonStyles =
    "flex-1 py-4 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-200 border border-[#191918]/10 cursor-pointer";

  // The primary button is dark-filled; secondary buttons are light with a hover effect
  const primaryButtonStyles = "bg-[#191918] text-[#FFFEF2] border-[#191918]";
  const secondaryButtonStyles =
    "bg-[#FFFEF2] hover:bg-[#191918]/10 text-[#191918]";

  // handleGetChats() on mount. That fetch populates Redux, and then useSelector reads from it.
  useEffect(() => {
    const fetchChats = async () => {
      const chats = await handleGetChats();

      console.log("chats received inside useEffect in HomePage:", chats);
    };

    fetchChats();
  }, []);

  return (
    <main className="grow h-screen overflow-y-auto p-16 relative">
      <div
        className="absolute top-[15%] left-[10%] w-[80%] h-[60%] blur-[80px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(252, 170, 45, 0.04) 0%, rgba(100, 116, 139, 0.04) 100%)",
        }}
      ></div>

      <header className="mb-12 relative z-10">
        <h1 className="text-3xl font-semibold tracking-tight mb-2 mt-0">
          Hey, {firstname}
        </h1>
        <p className="text-[#191918]/45 text-lg font-light m-0">
          The archives are quiet. Ready to refine the signal?
        </p>
      </header>

      <section className="relative bg-[#FFFEF2]/70 backdrop-blur-md border border-[#191918]/10 rounded-2xl p-10 mb-12 shadow-[0_4px_24px_-12px_rgba(25,25,24,0.05)] z-10">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[#FCAA2D]">
            <ZapIcon />
          </span>
          <h2 className="font-mono text-[0.7rem] uppercase tracking-widest text-[#191918]/45 m-0">
            Inkpot Intelligence
          </h2>
        </div>

        <div className="flex gap-4 border-t border-[#191918]/10 pt-8">
          {actionButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => btn?.action()}
              className={`${baseButtonStyles} ${btn.primary ? primaryButtonStyles : secondaryButtonStyles}`}
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-12 gap-12 relative z-10">
        <div className="col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-mono text-[0.7rem] uppercase tracking-widest text-[#191918]/45 m-0">
              Recent Conversations
            </h2>
            <a
              href="#"
              className="text-[0.65rem] font-mono border-b border-[#191918]/10 pb-0.5 text-[#191918] no-underline"
            >
              View all
            </a>
          </div>
          <div>
            {recentConversations?.map((convo, i) => (
              <div
                onClick={() => handleChatClick(convo._id)}
                key={i}
                className="grid grid-cols-[1fr_140px_100px] py-4 border-b border-[#191918]/10 items-center text-sm relative cursor-pointer"
              >
                <span className="font-medium">{convo.title}</span>
                <span className="font-mono text-[0.65rem] text-[#191918]/45">
                  {convo?.updatedAt.toLocaleDateString()}
                </span>
                <span
                  className="text-right font-mono text-[0.65rem]"
                  style={{ color: convo?.typeColor }}
                >
                  {/* {convo?.type} */}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-4">
          <div className="border border-[#191918]/10 rounded-xl p-6 bg-[#FFFEF2]/40 backdrop-blur-sm">
            <h2 className="font-mono text-[0.6rem] uppercase tracking-widest text-[#191918]/45 mb-4 mt-0">
              Ink Usage
            </h2>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-semibold tracking-tight">84%</span>
            </div>
            <div className="h-1 bg-[#191918]/10 rounded-full mb-6 overflow-hidden">
              <div className="h-full bg-[#FCAA2D] w-[84%]"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-[#191918]/10 pt-4">
              <div>
                <div className="text-[0.55rem] font-mono uppercase text-[#191918]/45">
                  Tokens
                </div>
                <div className="text-base font-medium">1.2M</div>
              </div>
              <div>
                <div className="text-[0.55rem] font-mono uppercase text-[#191918]/45">
                  Queries
                </div>
                <div className="text-base font-medium">4,812</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
