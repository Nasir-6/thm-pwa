# This file contains all the converters for various times
# This was done so each function can be unit tested to ensure they work as intended


# Fajr Converter
# Note: all Fajr times are between 2AM - 8AM so deal with 2 scenarios:
# 1) 4:35 -> 04:35
# 2) 04:35 -> Leave as is just return
def fajr_convert(time_str):
    is_missing_front0 = (len(time_str) == 4)
    if is_missing_front0:
        # 4:35 -> 04:35
        return "0" + time_str
    else:
        # 04:35 -> return as is
        return time_str



# Zuhr/Zohar Converter
# Note: all Zuhr times are between 11AM - 2PM so deal with 2 scenarios:
# 1) 11:35/12:35 -> leave as is just return
# 2) 01:35 -> 13:35
# 3) 1:35 -> 13:35
# 4) 13:35 -> Leave as is just return
def zuhr_convert(time_str):
    is_missing_front0 = (len(time_str) == 4)
    if (is_missing_front0 or time_str[0] == "0"):
        # If missingFront0 - 1:00
        # or if 01:00 - Need to convert to 13:00 - i.e chnage 1 to 13
        # Grab last 3 chars e.g :00 and add 13 to it!
        print("13" + time_str[-3:])
        return "13" + time_str[-3:]
    else:
        # 1) 12:45 - This is fine leave as is
        return time_str;
