"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
export enum NotificationType {
  Error,
  Info,
  Success,
  Message,
}

interface Notification {
  id: string;
  type: "Error" | "Info" | "Success" | "Message";
  message?: string;
  timeout?: number;
  read?: boolean;
}

interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift({
        read: false,
        ...action.payload,
      });
    },
    readNotification: (state, action: PayloadAction<string>) => {
      const notificationId = action.payload;
      state.notifications.forEach((notification) => {
        if (notification.id === notificationId) {
          notification.read = true;
        }
      });
    },
    readAllNotification: (state) => {
      state.notifications.forEach((notification) => (notification.read = true));
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const {
  addNotification,
  readAllNotification,
  readNotification,
  removeNotification,
} = notificationsSlice.actions;

export const notificationsReducer = notificationsSlice.reducer;
