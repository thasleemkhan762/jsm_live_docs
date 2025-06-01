"use client";

import { useSelf } from "@liveblocks/react/suspense";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborator";

interface ShareDocumentDialogProps {
  roomId: string;
  collaborators: any[];
  creatorId: string;
  currentUserType: UserType;
}

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");

  const shareDocumentHandler = async () => {
    if (!email) return;

    setLoading(true);
    try {
      // TODO: Implement sharing logic here
      setEmail("");
      setUserType("viewer");
      setOpen(false);
    } catch (error) {
      console.error("Error sharing document:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <Dialog open={open} onOpenChange={setOpen}>
    //     <DialogTrigger asChild>
    //         <Button variant="outline">Share</Button>
    //     </DialogTrigger>
    //     <DialogContent>
    //         <DialogHeader>
    //             <DialogTitle>Share Document</DialogTitle>
    //         </DialogHeader>
    //         <div className="space-y-4">
    //             <div className="space-y-2">
    //                 <label htmlFor="email" className="text-sm font-medium">
    //                     Email
    //                 </label>
    //                 <Input
    //                     id="email"
    //                     type="email"
    //                     placeholder="Enter email address"
    //                     value={email}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                 />
    //             </div>
    //             <div className="space-y-2">
    //                 <label htmlFor="userType" className="text-sm font-medium">
    //                     Permission
    //                 </label>
    //                 <select
    //                     id="userType"
    //                     value={userType}
    //                     onChange={(e) => setUserType(e.target.value as UserType)}
    //                     className="w-full p-2 border rounded-md"
    //                 >
    //                     <option value="viewer">Viewer</option>
    //                     <option value="editor">Editor</option>
    //                 </select>
    //             </div>
    //             <Button
    //                 onClick={shareDocumentHandler}
    //                 disabled={loading || !email}
    //                 className="w-full"
    //             >
    //                 {loading ? 'Sharing...' : 'Share'}
    //             </Button>
    //         </div>
    //     </DialogContent>
    // </Dialog>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="gradient-blue flex h-9 gap-1 px-4"
          disabled={currentUserType !== "editor"}
        >
          <Image
            src="/assets/icons/share.svg"
            alt="share"
            width={20}
            height={20}
            className="min-w-4 md:size-5"
          />
          <p className="mr-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Manage who can view this project</DialogTitle>
          <DialogDescription style={{ color: "#757575" }}>
            Select which users can view and edit this document
          </DialogDescription>
        </DialogHeader>
        <label
          htmlFor="email"
          className="text-sm font-medium text-white block mb-2"
        >
          Email
        </label>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 rounded-md bg-dark-400">
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="share-input"
            />
            <UserTypeSelector userType={userType} setUserType={setUserType} />
          </div>
          <Button
            type="submit"
            className="gradient-blue flex h-full gap-1 px-5"
            disabled={loading || !email}
          >
            {loading ? "Sending..." : "Invite"}
          </Button>
        </div>
        <div className="my-2 space-y-2">
          <ul className="flex flex-col">
            {collaborators.map((collaborator) => (
              <Collaborator
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={user.info}
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ShareModal;
