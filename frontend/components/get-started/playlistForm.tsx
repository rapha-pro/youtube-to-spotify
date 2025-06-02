"use client";

import { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  Card,
  CardBody,
} from "@heroui/react";
import { Link2, Music, Globe, Lock, ArrowRight } from "lucide-react";
import { gsap } from "gsap";

import { PlaylistDataProps, PlaylistFormProps } from "@/types";
import { youtubeAPI } from "@/utils/api_routes.ts/api";

export default function PlaylistForm({ onSubmit }: PlaylistFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<PlaylistDataProps>({
    url: "",
    name: "",
    description: "",
    isPublic: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<PlaylistDataProps>>({});

  const [isValidatingUrl, setIsValidatingUrl] = useState(false);

  useEffect(() => {
    // Animate form fields
    gsap.from(".form-field", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.from(".form-card", {
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });
  }, []);

  const validateForm = async (): Promise<boolean> => {
    const newErrors: Partial<PlaylistDataProps> = {};

    if (!formData.url.trim()) {
      newErrors.url = "Playlist URL is required";
    } else if (!isValidYouTubeURL(formData.url)) {
      newErrors.url = "Please enter a valid YouTube playlist URL";
    } else {
      // Validate URL with backend
      setIsValidatingUrl(true);
      try {
        const validation = await youtubeAPI.validatePlaylistUrl(formData.url);

        if (!validation.isValid) {
          newErrors.url = validation.message || "Invalid playlist URL";
        }
      } catch (error) {
        newErrors.url = "Unable to validate playlist URL";
      } finally {
        setIsValidatingUrl(false);
      }
    }

    if (!formData.name.trim()) {
      newErrors.name = "Playlist name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isValidYouTubeURL = (url: string): boolean => {
    const youtubePlaylistRegex =
      /^https:\/\/(www\.)?(youtube\.com|youtu\.be).*[?&]list=([a-zA-Z0-9_-]+)/;

    return youtubePlaylistRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validateForm();

    if (!isValid) return;

    setIsLoading(true);

    // Add loading animation
    gsap.to(".submit-button", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    setTimeout(() => {
      onSubmit(formData);
    }, 500);
  };

  const handleInputChange = (
    field: keyof PlaylistDataProps,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="form-card bg-gray-800/50 backdrop-blur-sm border border-gray-700">
        <CardBody className="p-8">
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            {/* Playlist URL */}
            <div className="form-field">
              <Input
                classNames={{
                  input: "text-white",
                  inputWrapper:
                    "border-gray-600 bg-gray-700/50 hover:border-gray-500 focus-within:border-blue-500",
                  label: "text-gray-300",
                }}
                endContent={
                  isValidatingUrl && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
                  )
                }
                errorMessage={errors.url}
                isInvalid={!!errors.url}
                label="YouTube Playlist URL"
                placeholder="https://www.youtube.com/playlist?list=..."
                startContent={<Link2 className="text-gray-400" size={18} />}
                value={formData.url}
                variant="bordered"
                onValueChange={(value) => handleInputChange("url", value)}
              />
            </div>

            {/* Playlist Name */}
            <div className="form-field">
              <Input
                classNames={{
                  input: "text-white",
                  inputWrapper:
                    "border-gray-600 bg-gray-700/50 hover:border-gray-500 focus-within:border-blue-500",
                  label: "text-gray-300",
                }}
                errorMessage={errors.name}
                isInvalid={!!errors.name}
                label="Playlist Name"
                placeholder="My Awesome Playlist"
                startContent={<Music className="text-gray-400" size={18} />}
                value={formData.name}
                variant="bordered"
                onValueChange={(value) => handleInputChange("name", value)}
              />
            </div>

            {/* Description */}
            <div className="form-field">
              <Textarea
                classNames={{
                  input: "text-white",
                  inputWrapper:
                    "border-gray-600 bg-gray-700/50 hover:border-gray-500 focus-within:border-blue-500",
                  label: "text-gray-300",
                }}
                label="Description (Optional)"
                minRows={3}
                placeholder="Tell us about your playlist..."
                value={formData.description}
                variant="bordered"
                onValueChange={(value) =>
                  handleInputChange("description", value)
                }
              />
            </div>

            {/* Public/Private Checkbox */}
            <div className="form-field">
              <div className="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                <Checkbox
                  classNames={{
                    wrapper: "border-gray-500",
                  }}
                  isSelected={formData.isPublic}
                  onValueChange={(value) =>
                    handleInputChange("isPublic", value)
                  }
                >
                  <div className="flex items-center gap-2">
                    {formData.isPublic ? (
                      <Globe className="text-green-400" size={16} />
                    ) : (
                      <Lock className="text-yellow-400" size={16} />
                    )}
                    <span className="text-white font-medium">
                      Make playlist public
                    </span>
                  </div>
                </Checkbox>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {formData.isPublic
                  ? "Your playlist will be visible to others on Spotify"
                  : "You can change this setting later in your Spotify account"}
              </p>
            </div>

            {/* Submit Button */}
            <div className="form-field pt-4">
              <Button
                className="submit-button w-full group"
                classNames={{
                  base: "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg",
                }}
                color="primary"
                endContent={
                  !isLoading && (
                    <ArrowRight
                      className="group-hover:translate-x-1 transition-transform"
                      size={18}
                    />
                  )
                }
                isLoading={isLoading}
                loadingText="Preparing Transfer..."
                size="lg"
                type="submit"
              >
                {isLoading ? "Preparing..." : "Start Transfer"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <Card className="bg-gray-800/30 border border-gray-700">
          <CardBody className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Music className="text-green-400" size={16} />
              </div>
              <h3 className="font-semibold text-white">
                High Quality Transfer
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              We match songs by title, artist, and album for the most accurate
              results
            </p>
          </CardBody>
        </Card>

        <Card className="bg-gray-800/30 border border-gray-700">
          <CardBody className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Globe className="text-blue-400" size={16} />
              </div>
              <h3 className="font-semibold text-white">Privacy Friendly</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Your data is processed securely and never stored permanently
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
