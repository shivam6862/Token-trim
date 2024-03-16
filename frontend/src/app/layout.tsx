import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import { NotificationContextProvider } from "@/contexts/Notification-context";
import Notifications from "@/components/notification/Notifications";
import { ChatBotContextProvider } from "@/contexts/ChatBot-context";
import SideBar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Custom chatbot",
  description: "Custom chatbot for your website",
  icons: "/robot.jpg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationContextProvider>
          <ChatBotContextProvider>
            <SideBar />
            <Notifications />
            <Header />
            {children}
          </ChatBotContextProvider>
        </NotificationContextProvider>
      </body>
    </html>
  );
}
