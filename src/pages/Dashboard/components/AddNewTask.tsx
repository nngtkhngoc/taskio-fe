/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, type ChangeEvent } from "react";
import { toast } from "sonner";

import {
  Plus,
  Mic,
  MicOff,
  Send,
  Briefcase,
  Book,
  Palette,
  AlignJustify,
  Trash2,
  Star,
  AlarmClock,
  User,
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { generateTaskFromText } from "@/functions/generateTaskFromText";
import type { CreateTaskData, Subtask } from "@/types/index";
import { useCreateTask } from "@/hooks/useTask";
import { cn } from "@/lib/utils";

export const AddNewTask = () => {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [urgent, setUrgent] = useState(false);
  const [important, setImportant] = useState(false);
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [isListening, setIsListening] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialog, setIsDialog] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setTitle(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }

    return () => {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
    };
  }, []);

  // api
  const { mutate: createTaskMutate, isPending } = useCreateTask();
  const addNewTask = () => {
    const newTask: CreateTaskData = {
      name,
      note,
      deadline: deadline ?? null,
      is_important: important,
      is_urgent: urgent,
      category: selectedCategories,
      subtasks: subtasks,
    };

    createTaskMutate(newTask, {
      onSuccess: () => {
        setIsDialogOpen(false);
        toast.success("Task has been created");

        setTitle("");
        setName("");
        setNote("");
        setDeadline(new Date());
        setSelectedCategories([]);
        setUrgent(false);
        setImportant(false);
        setSubtasks([]);
      },
      onError: (err: any) => {
        if (err.response.data.message) toast.error(err.response.data.message);
        else toast.error("Error create new taks!");
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewTask();
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    if (value.trim() !== "") {
      setIsDialog(false);
    } else {
      setIsDialog(true);
    }
  };

  // Subtask
  const handleRemoveSubtask = (id: string) => {
    setSubtasks(subtasks.filter((s) => s.id !== id));
  };

  const [newSubtask, setNewSubtask] = useState("");
  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    setSubtasks([
      ...subtasks,
      { id: crypto.randomUUID(), name: newSubtask, is_completed: false },
    ]);
    setNewSubtask("");
    console.log(subtasks);
  };

  const handleToggleCompleted = (id: string, checked: boolean) => {
    setSubtasks(
      subtasks.map((s) => (s.id === id ? { ...s, completed: checked } : s))
    );
  };

  // Category
  const colorCategoryBg = {
    pink: {
      bg: "bg-pink-100",
      hoverBg: "hover:bg-pink-100",
      text: "text-pink-600",
    },
    lime: {
      bg: "bg-lime-100",
      hoverBg: "hover:bg-lime-100",
      text: "text-lime-600",
    },
    amber: {
      bg: "bg-amber-100",
      hoverBg: "hover:bg-amber-100",
      text: "text-amber-600",
    },
    zinc: {
      bg: "bg-zinc-100",
      hoverBg: "hover:bg-zinc-100",
      text: "text-zinc-600",
    },
    sky: {
      bg: "bg-sky-100",
      hoverBg: "hover:bg-sky-100",
      text: "text-sky-600",
    },
  };
  const categories = [
    {
      value: "Work",
      label: "Work",
      color: "amber",
      icon: Briefcase,
    },
    {
      value: "Personal",
      label: "Personal",
      color: "sky",
      icon: User,
    },
    {
      value: "Study",
      label: "Study",
      color: "pink",
      icon: Book,
    },
    {
      value: "Hobby",
      label: "Hobby",
      color: "lime",
      icon: Palette,
    },
    {
      value: "Other",
      label: "Other",
      color: "zinc",
      icon: AlignJustify,
    },
  ];
  const categoryMap: Record<
    string,
    { text: string; hoverBg: string; icon: React.ElementType; bg: string }
  > = categories.reduce((acc, { value, color, icon }) => {
    acc[value] = {
      ...colorCategoryBg[color as keyof typeof colorCategoryBg],
      icon,
    };
    return acc;
  }, {} as Record<string, { text: string; hoverBg: string; icon: React.ElementType; bg: string }>);

  const handleCategoryChange = (value: string) => {
    if (!selectedCategories.includes(value))
      setSelectedCategories([...selectedCategories, value]);
  };

  const renderSelectedCategories = () => (
    <div className="flex flex-wrap gap-2 mt-2">
      {selectedCategories.map((cat) => {
        const info = categoryMap[cat];
        const Icon = info.icon;
        return (
          <div
            key={cat}
            className={cn(
              `flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium px-2 py-2  border border-2 border-black`,
              info.text,
              info.bg
            )}
          >
            <Icon size={14} />
            {cat}
            <button
              type="button"
              onClick={() =>
                setSelectedCategories(
                  selectedCategories.filter((v) => v !== cat)
                )
              }
              className="ml-1 text-gray-500 hover:text-gray-800"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );

  const renderCategoryOptions = () =>
    categories.map(({ value, label, icon: Icon }) => {
      const info = categoryMap[value];
      return (
        <SelectItem
          key={value}
          value={value}
          className={cn(info.text, info.hoverBg, "flex items-center gap-2")}
        >
          <Icon size={16} />
          {label}
        </SelectItem>
      );
    });

  const handleGenerateTask = () => {
    const data = generateTaskFromText(title);

    createTaskMutate(data, {
      onSuccess: () => {
        setIsDialogOpen(false);
        toast.success("Task has been created");

        setTitle("");
        setName("");
        setNote("");
        setDeadline(new Date());
        setSelectedCategories([]);
        setUrgent(false);
        setImportant(false);
        setSubtasks([]);
        setIsDialog(true);
      },
      onError: (err: any) => {
        if (err.response.data.message) toast.error(err.response.data.message);
        else toast.error("Error create new taks!");
      },
    });
  };

  return (
    <div className="w-full max-w-4xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center space-x-2 p-2 bg-white rounded-2xl transition-all duration-200  border border-2 border-black ">
          <Input
            type="text"
            value={title}
            onChange={(e) => handleChangeTitle(e)}
            placeholder="e.g: Buy milk tomorrow"
            className="focus:outline-none rounded-xl w-full"
          />

          <div className="flex items-center space-x-2">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div>
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isListening
                        ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400 animate-pulse"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 "
                    }
                `}
                  >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>Tap to add task by voice</HoverCardContent>
            </HoverCard>

            {isDialog ? (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <div>
                    <button
                      type="button"
                      className="p-2 bg-gradient-to-r bg-blue-400 border border-black border-2 text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer hover:rotate-45"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]  max-h-[90vh] overflow-y-auto scrollbar-hide">
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>
                      Fill in the details of your task. Description is optional.
                    </DialogDescription>
                  </DialogHeader>

                  <form className="grid gap-4">
                    {/* Task name */}
                    <div className="grid gap-2">
                      <Label htmlFor="name">
                        Task <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter task name"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    {/* Note (optional) */}
                    <div className="grid gap-2">
                      <Label htmlFor="note">Note </Label>
                      <Input
                        id="note"
                        name="note"
                        placeholder="Add task note"
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>

                    {/* Deadline */}
                    <div className="w-4/5 pb-3">
                      <Label htmlFor="deadline">
                        Deadline <span className="text-red-500">*</span>
                      </Label>
                      <Calendar
                        mode="single"
                        selected={deadline}
                        onSelect={setDeadline}
                        required
                      />
                    </div>

                    {/* Priority */}
                    <div className="grid gap-2">
                      <Label>Priority</Label>
                      <div className="flex gap-3">
                        <Toggle
                          pressed={important}
                          onPressedChange={setImportant}
                          className={cn(
                            "border border-2 border-black bg-white data-[state=on]:bg-yellow-200 data-[state=on]:text-yellow-800 cursor-pointer"
                          )}
                        >
                          <Star /> Important
                        </Toggle>
                        <Toggle
                          pressed={urgent}
                          onPressedChange={setUrgent}
                          className={cn(
                            "border border-2 border-black bg-white data-[state=on]:bg-red-200 data-[state=on]:text-red-800 cursor-pointer"
                          )}
                        >
                          <AlarmClock /> Urgent
                        </Toggle>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="grid gap-2">
                      <Label>Category</Label>
                      <Select
                        onValueChange={(value) => handleCategoryChange(value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Choose category" />
                        </SelectTrigger>
                        <SelectContent>{renderCategoryOptions()}</SelectContent>
                      </Select>
                      {renderSelectedCategories()}
                    </div>

                    {/* SubTasks */}
                    <div className="grid gap-2">
                      <Label>Subtasks</Label>

                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Enter subtask..."
                          value={newSubtask}
                          onChange={(e) => setNewSubtask(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddSubtask();
                            }
                          }}
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant={"noShadow"}
                          onClick={handleAddSubtask}
                          disabled={!newSubtask.trim()}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>

                      {/* Subtasks */}
                      <div className="flex flex-col gap-2">
                        {subtasks.length > 0 &&
                          subtasks.map(
                            (subtask) =>
                              subtask.name && (
                                <div
                                  key={subtask.id}
                                  className="flex items-center justify-between bg-white !border !border-black !border-2  rounded-md py-2 px-2"
                                >
                                  <div className="flex items-center gap-2">
                                    <Checkbox
                                      checked={subtask.is_completed}
                                      onCheckedChange={(checked) =>
                                        handleToggleCompleted(
                                          subtask.id,
                                          Boolean(checked)
                                        )
                                      }
                                    />
                                    <span
                                      className={`text-sm ${
                                        subtask.is_completed
                                          ? "line-through text-gray-500"
                                          : ""
                                      }`}
                                    >
                                      {subtask.name}
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRemoveSubtask(subtask.id)
                                    }
                                    className="cursor-pointer"
                                  >
                                    <Trash2 className="w-4 text-zinc-700 hover:text-red-600 transition-all duration-3 00" />
                                  </button>
                                </div>
                              )
                          )}
                      </div>
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="oppositeDefault" type="button">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        type="button"
                        disabled={isPending}
                        onClick={handleSubmit}
                      >
                        {isPending ? "Adding..." : "Add Task"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
                {/* )} */}
              </Dialog>
            ) : (
              <button
                type="button"
                className="disabled:cursor-waiting p-2 bg-gradient-to-r bg-blue-400 border border-black border-2 text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer hover:rotate-45"
                disabled={isPending}
                onClick={handleGenerateTask}
              >
                <Send size={20} />
              </button>
            )}
          </div>
        </div>

        {isListening && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg text-sm">
            Listening... Speak now
          </div>
        )}
      </form>
    </div>
  );
};
