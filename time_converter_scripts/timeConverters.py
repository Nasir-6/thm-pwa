# This file contains all the converters for various times
# This was done so each function can be unit tested to ensure they work as intended


# Fajr Converter
# Note: all Fajr times are between 2AM - 8AM so deal with 2 scenarios:
# 1) 4:35 -> 04:35
# 2) 04:35 -> Leave as is just return
def fajr_convert(time_str):
    is_h_mm_format = (len(time_str) == 4)
    if is_h_mm_format:
        # 4:35 -> 04:35
        return "0" + time_str
    else:
        # 04:35 -> return as is
        return time_str


# Zuhr/Zohar Converter
# Note: all Zuhr times are between 11AM - 2PM so deal with 2 scenarios:
# 1) 1:35 -> 13:35
# 2) 01:35 -> 13:35
# 3) 11:35/12:35 -> leave as is just return
# 4) 13:35 -> Leave as is just return
def zuhr_convert(time_str):
    is_h_mm_format = (len(time_str) == 4)
    if is_h_mm_format:
        # 1) 1:35 -> 13:35
        time_hr_str = str(int(time_str[0]) + 12)
        return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and time_str[0] == "0":
        # 2) 01:35 -> 13:35
        time_hr_str = str(int(time_str[1]) + 12)
        return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and time_str[0] != "0":
        # 3) 11:35/12:35 -> leave as is just return
        # 4) 13:35 -> Leave as is just return
        return time_str


# Asr Converter
# Note: all Asr times are between 2PM - 7:30PM so deal with 3 scenarios:
# 1) 4:35 -> 16:35
# 2) 04:35 -> 16:35
# 3) 16:35 -> leave as is just return
def asr_convert(time_str):
    is_h_mm_format = (len(time_str) == 4)
    if is_h_mm_format:
        # 1) 4:35 -> 16:35
        time_hr_str = str(int(time_str[0]) + 12)
        return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and time_str[0] == "0":
        # 2) 04:35 -> 16:35
        time_hr_str = str(int(time_str[1]) + 12)
        return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and time_str[0] != "0":
        # 3) 16:35 -> leave as is just return
        return time_str



# Maghrib Converter
# IMPORTANT NOTE: The code is exactly the same as asr_converter,
# but was separated just incase for clarity incase I missed a case
# Note: all Maghrib times are between 4PM - 9:30PM so deal with 3 scenarios:
# 1) 9:35 -> 21:35
# 2) 09:35 -> 21:35
# 3) 21:35 -> leave as is just return
def maghrib_convert(time_str):
    is_h_mm_format = (len(time_str) == 4)
    if is_h_mm_format:
        # 1) 9:35 -> 21:35
        time_hr_str = str(int(time_str[0]) + 12)
        return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and time_str[0] == "0":
        # 2) 09:35 -> 21:35
        time_hr_str = str(int(time_str[1]) + 12)
        return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and time_str[0] != "0":
        # 3) 21:35 -> leave as is just return
        return time_str



# Isha Converter
# IMPORTANT NOTE: in csv spelt esha and not isha!
# Note: all Isha times are between 5:30PM - 11:15 PM so deal with 3 scenarios:
# 1) 7:35 -> 19:35
# 2) 07:35 -> 19:35
# 3) 11:15 -> 23:15
# 4) 19:35 -> leave as is just return
# 5) 22:35 -> leave as is just return

def isha_convert(time_str):
    is_h_mm_format = (len(time_str) == 4)
    if is_h_mm_format:
        # 1) 9:35 -> 21:35
        time_hr_str = str(int(time_str[0]) + 12)
        return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and time_str[0] == "0":
        # 2) 09:35 -> 21:35
        time_hr_str = str(int(time_str[1]) + 12)
        return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and time_str[0] != "0":
        # 3) 21:35 -> leave as is just return
        return time_str

