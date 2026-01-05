import { User, Post, Comment } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    createdAt: "2025-06-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    createdAt: "2025-07-20T14:30:00Z",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    email: "elena@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    createdAt: "2025-08-10T09:15:00Z",
  },
  {
    id: "4",
    name: "Alex Kim",
    email: "alex@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    createdAt: "2025-09-05T16:45:00Z",
  },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    userId: "1",
    content: "Just shipped a major feature that's been in development for months! 🚀 The feeling of seeing your work go live never gets old. Grateful for an amazing team that pushed through the challenges together. #ProductLaunch #TeamWork",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
    createdAt: "2026-01-05T08:00:00Z",
    updatedAt: "2026-01-05T08:00:00Z",
  },
  {
    id: "2",
    userId: "2",
    content: "Reflecting on my journey from junior developer to tech lead. The biggest lesson? Never stop learning and always lift others as you climb. Here's to mentorship and growth! 💡",
    createdAt: "2026-01-04T15:30:00Z",
    updatedAt: "2026-01-04T15:30:00Z",
  },
  {
    id: "3",
    userId: "3",
    content: "Attended an incredible AI conference this week. The advancements in generative AI are mind-blowing. Can't wait to implement some of these ideas in our upcoming projects! 🤖✨",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    createdAt: "2026-01-03T11:20:00Z",
    updatedAt: "2026-01-03T11:20:00Z",
  },
  {
    id: "4",
    userId: "4",
    content: "Hot take: The best code is the code you don't write. Simplicity beats complexity every time. Focus on solving the problem, not showing off clever solutions. 🎯",
    createdAt: "2026-01-02T09:45:00Z",
    updatedAt: "2026-01-02T09:45:00Z",
  },
  {
    id: "5",
    userId: "1",
    content: "Remote work tip: Block 'focus time' on your calendar like you would meetings. Protect your deep work hours. Your productivity will thank you! 📅",
    createdAt: "2026-01-01T14:00:00Z",
    updatedAt: "2026-01-01T14:00:00Z",
  },
];

export const mockComments: Comment[] = [
  {
    id: "1",
    postId: "1",
    userId: "2",
    content: "Congrats Sarah! This is huge! 🎉",
    createdAt: "2026-01-05T09:00:00Z",
    updatedAt: "2026-01-05T09:00:00Z",
  },
  {
    id: "2",
    postId: "1",
    userId: "3",
    content: "Amazing work! Can't wait to try the new features.",
    createdAt: "2026-01-05T10:30:00Z",
    updatedAt: "2026-01-05T10:30:00Z",
  },
  {
    id: "3",
    postId: "2",
    userId: "1",
    content: "This is so inspiring Marcus! Your journey has been incredible to watch.",
    createdAt: "2026-01-04T16:00:00Z",
    updatedAt: "2026-01-04T16:00:00Z",
  },
  {
    id: "4",
    postId: "3",
    userId: "4",
    content: "Which sessions did you find most valuable? Would love recommendations!",
    createdAt: "2026-01-03T12:00:00Z",
    updatedAt: "2026-01-03T12:00:00Z",
  },
  {
    id: "5",
    postId: "4",
    userId: "2",
    content: "100% agree. KISS principle for the win! 🙌",
    createdAt: "2026-01-02T10:15:00Z",
    updatedAt: "2026-01-02T10:15:00Z",
  },
];
