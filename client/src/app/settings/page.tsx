"use client";
import React, { useState } from "react";
import { Moon, Sun, Bell, User, Mail } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { useTheme } from "next-themes";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-4">
      <Header name="Settings" />
      <p className="text-muted-foreground">
        Manage your account settings and preferences.
      </p>
      <div className="max-w-3xl py-12">
        <div className="space-y-6">
          <div className="p-6 rounded-lg ">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-full bg-primary/10">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Profile Information</h2>
                <p className="text-sm text-muted-foreground">
                  Your personal information and email
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col space-y-1">
                <Label className="text-sm font-medium">Username</Label>
                <div className="flex items-center space-x-2 mt-1.5">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm">johndoe</p>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <Label className="text-sm font-medium">Email</Label>
                <div className="flex items-center space-x-2 mt-1.5">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm">john.doe@example.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg ">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-full bg-primary/10">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Preferences</h2>
                <p className="text-sm text-muted-foreground">
                  Customize your application experience
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Appearance</Label>
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-full bg-primary/10">
                      {theme === "dark" ? (
                        <Moon className="w-4 h-4" />
                      ) : (
                        <Sun className="w-4 h-4" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {theme === "dark" ? "Dark theme" : "Light theme"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={theme === "light"}
                  className="data-[state=checked]:bg-primary"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Notifications</Label>
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-full bg-primary/10">
                      <Bell className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notifications
                        ? "Notifications enabled"
                        : "Notifications disabled"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
