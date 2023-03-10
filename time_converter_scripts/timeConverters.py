# This file contains all the converters for various times
# This was done so each function can be unit tested to ensure they work as intended


# period_to_colon
# 1) 7.35 -> 7:35
# 2) 12.35 -> 12:35
# 3) 12:35 -> Leave as is just return
# 4) 7:35 -> Leave as is just return
def period_to_colon(time_str):
    is_h_mm_format = (len(time_str) == 4)
    isPeriod = time_str[-3] == "."
    if is_h_mm_format and isPeriod:
        # 1) 7.35 -> 7:35
        return time_str[0] + ":" + time_str[-2:]
    elif not is_h_mm_format and isPeriod:
        # 2) 12.35 -> 12:35
        return time_str[:2] + ":" + time_str[-2:]
    elif not isPeriod:
        # 3) 12:35 -> Leave as is just return
        # 4) 7:35 -> Leave as is just return
        return time_str

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
# 1a) 1:35 -> 01:35 (ifForWordPress just add a 0)
# 1b) 1:35 -> 13:35 (if not for WP convert to 24hrs)
# 2) 13:35 -> 01:35 (if for WP convert back to 12hrs with 0 in front)
# 3a) 01:35 -> 01:35 (leave as is for WP)
# 3b) 11:35 -> 11:35 (leave as is for WP)
# 4) 01:35 -> 13:35 (convert to 24 hrs if not for WP)
# 5) 11:35/12:35 -> leave as is just return for
# 6) 13:35 -> Leave as is just return (Not for WP)
def zuhr_convert(time_str, isForWordPress):
    is_h_mm_format = (len(time_str) == 4)
    if is_h_mm_format:
        if isForWordPress:
            # 1a) 1:35 -> 01:35
            return "0" + time_str
        else:
            # 1b) 1:35 -> 13:35
            time_hr_str = str(int(time_str[0]) + 12)
            return time_hr_str + time_str[-3:]

    elif isForWordPress:
        # for wordpress keep all times in 12hr format BUT add in 0 where needed like first case!
        if(time_str[:2] == "13"):
            # 2) 13:35 -> 01:35
            return "01" + time_str[-3:]
        else:
            # 3a) 01:35 -> 01:35
            # 3b) 11:35 -> 11:35
            return time_str

    elif not is_h_mm_format and time_str[0] == "0":
        # 4) 01:35 -> 13:35
        time_hr_str = str(int(time_str[1]) + 12)
        return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and time_str[0] != "0":
        # 5) 11:35/12:35 -> leave as is just return
        # 6) 13:35 -> Leave as is just return
        return time_str


# Asr Converter
# Note: all Asr times are between 2PM - 7:30PM so deal with 3 scenarios:
# 1a) 4:35 -> 04:35 (is for WP leave as is)
# 1b) 4:35 -> 16:35  (Is not for WP so convert to 24hrs)
# 2a) 04:35 -> 04:35 (Is for WP so leave it)
# 2b) 04:35 -> 16:35 (not for WP so convert to 24hrs)
# 3a) 16:35 -> 04:35 (is for WP so convert back to 12hrs)
# 3b) 16:35 -> leave as is just return (Not for WP)
def asr_convert(time_str, isForWordPress):
    is_h_mm_format = (len(time_str) == 4)
    if is_h_mm_format:
        if isForWordPress:
            # 1a) 4:35 -> 04:35
            return "0" + time_str
        else:
            # 1b) 4:35 -> 16:35
            time_hr_str = str(int(time_str[0]) + 12)
            return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and time_str[0] == "0":
        if isForWordPress:
            # 2a) 04:35 -> 04:35
            return time_str
        else:
            # 2b) 04:35 -> 16:35
            time_hr_str = str(int(time_str[1]) + 12)
            return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and time_str[0] != "0":
        if isForWordPress:
            # 3a) 16:35 -> 04:35
            time_hr_str = "0" + str(int(time_str[:2]) - 12)
            return time_hr_str + time_str[-3:]
        else:
            # 3b) 16:35 -> leave as is just return
            return time_str


# Maghrib Converter
# IMPORTANT NOTE: The code is exactly the same as asr_converter,
# but was separated just incase for clarity incase I missed a case
# Note: all Maghrib times are between 4PM - 9:30PM so deal with 3 scenarios:
# 1a) 9:35 -> 09:35 (Is for WP so leave in 12Hrs)
# 1b) 9:35 -> 21:35 (Is not for WP so convert to 24hrs)
# 2a) 09:35 -> 09:35 (is for WP so leave as is)
# 2b) 09:35 -> 21:35 (not for wp so convert to 24hrs
# 3a) 21:35 -> 09:35 (is for wp so convert to 12hrs)
# 3b) 21:35 -> leave as is just return (as not for wp)
def maghrib_convert(time_str, isForWordPress):
    is_h_mm_format = (len(time_str) == 4)
    if is_h_mm_format:
        if isForWordPress:
            # 1a) 9:35 -> 09:35
            return "0" + time_str
        else:
            # 1b) 9:35 -> 21:35
            time_hr_str = str(int(time_str[0]) + 12)
            return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and time_str[0] == "0":
        if isForWordPress:
            # 2a) 09:35 -> 09:35
            return time_str
        else:
            # 2b) 09:35 -> 21:35
            time_hr_str = str(int(time_str[1]) + 12)
            return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and time_str[0] != "0":
        if isForWordPress:
            # 3a) 21:35 -> 09:35
            time_hr_str = "0" + str(int(time_str[:2]) - 12)
            return time_hr_str + time_str[-3:]
        else:
            # 3b) 21:35 -> leave as is just return
            return time_str



# Isha Converter
# IMPORTANT NOTE: in csv spelt esha and not isha!
# Note: all Isha times are between 5:30PM - 11:15 PM so deal with 3 scenarios:
# 1a) 7:35 -> 07:35 (return in 12 hrs as for WP)
# 1b) 7:35 -> 19:35 (return in 24hrs as not for WP)
# 2a) 07:35 -> 07:35 (return in 12hrs as for WP)
# 2b) 07:35 -> 19:35 (return in 24hr as not for WP)
# 3a) 11:15 -> 11:15 (return in 12hrs for WP)
# 3b) 11:15 -> 23:15 (return in 24hrs as not for wp)
# 4a) 19:35 -> 07:35 (return in 12hrs as for wp - also add 0 as before 10PM)
# 4b) 22:35 -> 10:35 (return in 12hrs as for wp - after 10pm)
# 5a) 19:35 -> leave as is just return (as not for wp)
# 5b) 22:35 -> leave as is just return (as not for wp
def isha_convert(time_str, isForWordPress):
    is_h_mm_format = (len(time_str) == 4)
    if is_h_mm_format:
        if isForWordPress:
            # 1a) 7:35 -> 07:35
            return "0" + time_str
        else:
            # 1b) 7:35 -> 19:35
            time_hr_str = str(int(time_str[0]) + 12)
            return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and time_str[0] == "0":
        if isForWordPress:
            # 2a) 07:35 -> 07:35
            return time_str
        else:
            # 2b) 07:35 -> 19:35
            time_hr_str = str(int(time_str[1]) + 12)
            return time_hr_str + time_str[-3:]

    elif not is_h_mm_format and (time_str[:2] == "10" or time_str[:2] == "11" or time_str[:2] == "12"):
        if isForWordPress:
            # 3a) 11:15 -> 11:15
            return time_str
        else:
            # 3b) 11:15 -> 23:15
            time_hr_str = str(int(time_str[:2]) + 12)
            return time_hr_str + time_str[-3:]
    else:
        if isForWordPress:
            time_hr_number = int(time_str[:2]) - 12
            if(time_hr_number < 10):
                # 4a) 19:35 -> 07:35
                time_hr_str = "0" + str(int(time_str[:2]) - 12)
                return time_hr_str + time_str[-3:]
            else:
                # 4b) 22:35 -> 10:35
                time_hr_str = str(int(time_str[:2]) - 12)
                return time_hr_str + time_str[-3:]
        else:
            # 5a) 19:35 -> leave as is just return
            # 5b) 22:35 -> leave as is just return
            return time_str
