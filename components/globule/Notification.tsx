"use client";
import {
  readAllNotification,
  readNotification,
} from "@/utils/redux/notifiySlice";
import { RootState, useAppDispatch, useAppSelector } from "@/utils/redux/store";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { IoIosDoneAll } from "react-icons/io";
import { MdError } from "react-icons/md";
import { useDispatch } from "react-redux";
import { BellRing, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Notification(props: any) {
  const notify = useAppSelector(
    (state: RootState) => state.notifications.notifications
  );
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(readAllNotification());
    props.data(false);
  };
  const notifications = (
    type: string,
    message: any,
    read: boolean | undefined
  ): ReactNode => {
    switch (type) {
      case "Error":
        if (read === false) {
          return (
            <div className=" relative flex justify-start w-3 h-3">
              <span className="animate-ping absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75"></span>
              <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
            </div>
          );
        } else {
          return (
            <>
              <span
                className={`${(read =
                  false &&
                  "animate-ping")} bg-red-500 flex w-2 h-2 translate-y-1 rounded-full`}
              />
              {read}
            </>
          );
        }
      case "Success":
        if (read === false) {
          return (
            <div className=" relative flex justify-start w-3 h-3">
              <span className="animate-ping bg-sky-400 absolute inline-flex w-full h-full rounded-full opacity-75"></span>
              <span className="bg-sky-500 relative inline-flex w-3 h-3 rounded-full"></span>
            </div>
          );
        } else {
          return (
            <>
              <span
                className={`${(read =
                  false &&
                  "animate-ping")} bg-sky-500 flex w-2 h-2 translate-y-1 rounded-full`}
              />
              {read}
            </>
          );
        }
      case "Message":
        if (read === false) {
          return (
            <div className=" relative flex justify-start w-3 h-3">
              <span className="animate-ping bg-sky-400 absolute inline-flex w-full h-full rounded-full opacity-75"></span>
              <span className="bg-sky-500 relative inline-flex w-3 h-3 rounded-full"></span>
            </div>
          );
        } else {
          return (
            <>
              <span
                className={`${(read =
                  false &&
                  "animate-ping")} bg-sky-500 flex w-2 h-2 translate-y-1 rounded-full`}
              />
              {read}
            </>
          );
        }
      case "Info":
        if (read === false) {
          return (
            <div className=" relative flex justify-start w-3 h-3">
              <span className="animate-ping absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75"></span>
              <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
          );
        } else {
          return (
            <>
              <span
                className={`${(read =
                  false &&
                  "animate-ping")} bg-green-500 flex w-2 h-2 translate-y-1 rounded-full`}
              />
              {read}
            </>
          );
        }

      default:
        return null;
    }
  };
  const unread = notify.reduce((unread, massage) => {
    if (massage.read === false) {
      return unread + 1;
    }
    return unread;
  }, 0);
  return (
    <Card className={cn("w-[380px] float-end mt-8  relative z-50")}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have {unread} unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {notify.slice(0, 5).map((notification, index) => (
            <div
              key={index}
              className="mb-4  grid grid-cols-[25px_1fr] items-start  pb-4 last:mb-0 last:pb-0"
            >
              {notifications(
                notification.type,
                notification.message,
                notification.read
              )}
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.message}
                </p>
                <p className="text-muted-foreground text-sm">
                  {notification.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleClick}>
          <Check className="w-4 h-4 mr-2" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}
