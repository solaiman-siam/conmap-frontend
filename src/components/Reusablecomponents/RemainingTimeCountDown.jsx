import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import useAxiosSecure from "../../hooks/api-hooks/useAxiosSecureRemaining";

export default function RemainingTimeCountDown({ isScrolled, center }) {
  const [initialData, setInitialData] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [isExpired, setIsExpired] = useState(false);
  const axiosCommon = useAxiosSecure();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axiosCommon.get("/user-subscription-check");
        setInitialData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };

    fetchInitialData();
    const intervalId = setInterval(fetchInitialData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!initialData) return;

    const trialEndDate = new Date(initialData.user_subscription.trial_ends_at);
    const now = new Date();
    const difference = trialEndDate.getTime() - now.getTime();

    if (difference <= 0) {
      setIsExpired(true);
      setTimeRemaining({ days: 0, hours: 0, minutes: 0 });
      return;
    }

    const updateTime = () => {
      const timeStr = initialData.remaining_time;
      console.log("Time String:", timeStr);

      const daysMatch = timeStr.match(/(\d+)\s*days?/);
      const hoursMatch = timeStr.match(/(\d+)\s*hours?/);
      const minsMatch = timeStr.match(/(\d+)\s*mins?/);

      const days = daysMatch ? parseInt(daysMatch[1]) : 0;
      const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
      const minutes = minsMatch ? parseInt(minsMatch[1]) : 0;

      setTimeRemaining({ days, hours, minutes });
    };

    updateTime();
  }, [initialData]);

  return (
    <div className={isScrolled ? "text-[#007570]" : "text-white"}>
      <div className={`flex items-center gap-2 mb-1 ${center && center}`}>
        <Clock className="h-5 w-5 text-primary" />
        <span className="font-medium">Time Remaining</span>
      </div>

      {isExpired ? (
        <div className="text-center py-2">
          <p className="text-destructive font-semibold">
            Your trial has expired
          </p>
        </div>
      ) : (
        <div className="flex gap-2 text-center">
          <div className="flex items-center">
            <div className="bg-background rounded-md pr-3 font-mono text-2xl font-bold">
              {timeRemaining.days}
            </div>
            <span className="text-xs mt-1">Days</span>
          </div>
          <div className="flex items-center">
            <div className="bg-background rounded-md pr-3 font-mono text-2xl font-bold">
              {timeRemaining.hours.toString().padStart(2, "0")}
            </div>
            <span className="text-xs mt-1">Hours</span>
          </div>
          <div className="flex items-center">
            <div className="bg-background rounded-md pr-3 font-mono text-2xl font-bold">
              {timeRemaining.minutes.toString().padStart(2, "0")}
            </div>
            <span className="text-xs mt-1">Minutes</span>
          </div>
        </div>
      )}
    </div>
  );
}
