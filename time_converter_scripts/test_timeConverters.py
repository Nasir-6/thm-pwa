from timeConverters import period_to_colon, fajr_convert, zuhr_convert, asr_convert, maghrib_convert, isha_convert

# =============== period_to_colon Tests ==================
def test_will_convert_period_to_colon_time_in_h_mm_format():
    # Given
    time = "7.35"
    # When
    result = period_to_colon(time)
    # Then
    assert result == "7:35"

def test_will_convert_period_to_colon_time_in_hh_mm_format():
    # Given
    time = "12.35"
    # When
    result = period_to_colon(time)
    # Then
    assert result == "12:35"

def test_will_return_time_str_if_already_has_colon():
    # Given
    time = "12:35"
    time2 = "7:35"
    # When
    result = period_to_colon(time)
    result2 = period_to_colon(time2)
    # Then
    assert result == "12:35"
    assert result2 == "7:35"

# =============== fajr_convert Tests ==================
def test_will_convert_fajr_time_with_missing_0():
    # Given
    time = "4:35"
    # When
    result = fajr_convert(time)
    # Then
    assert result == "04:35"

def test_will_return_fajr_time_as_normal_if_already_with_0():
    # Given
    time = "04:35"
    # When
    result = fajr_convert(time)
    # Then
    assert result == "04:35"



# =============== zuhr_convert Tests ==================
def test_will_return_zuhr_time_in_12hr_with_missing_0_for_WordPress():
    # 1a) 1:35 -> 01:35
    # Given
    time = "1:35"
    isForWordPress = True
    # When
    result = zuhr_convert(time, True)
    # Then
    assert result == "01:35"

def test_will_return_zuhr_time_24hr_with_missing_0_and_if_not_for_WordPress():
    # 1b) 1:35 -> 13:35
    # Given
    time = "1:35"
    isForWordPress = False
    # When
    result = zuhr_convert(time, isForWordPress)
    # Then
    assert result == "13:35"

def test_will_return_zuhr_time_in_12hr_for_WordPress_if_after_1PM_and_written_in_24hrs():
    # 2) 13:35 -> 01:35
    # Given
    time = "13:35"
    isForWordPress = True
    # When
    result = zuhr_convert(time, True)
    # Then
    assert result == "01:35"

def test_will_return_zuhr_time_in_12hr_for_WordPress_if_after_1PM():
    # 3a) 01:35 -> 01:35
    # Given
    time = "01:35"
    isForWordPress = True
    # When
    result = zuhr_convert(time, True)
    # Then
    assert result == "01:35"

def test_will_return_zuhr_time_in_12hr_for_WordPress_if_before_1PM():
    # 3b) 11:35 -> 11:35
    # Given
    time = "11:35"
    isForWordPress = True
    # When
    result = zuhr_convert(time, True)
    # Then
    assert result == "11:35"

def test_will_return_zuhr_time_in_24hrs_with_0_infront_and_not_for_Wordpress():
    # 4) 01:35 -> 13:35
    # Given
    time = "01:35"
    isForWordPress = False
    # When
    result = zuhr_convert(time, isForWordPress)
    # Then
    assert result == "13:35"

def test_will_return_zuhr_time_before_1_PM_and_is_not_for_WordPress():
    # 5) 11:35/12:35 -> leave as is just return
    # Given
    time = "11:35"
    time2 = "12:45"
    isForWordPress = False
    # When
    result = zuhr_convert(time, isForWordPress)
    result2 = zuhr_convert(time2, isForWordPress)
    # Then
    assert result == "11:35"
    assert result2 == "12:45"

def test_will_return_zuhr_time_if_already_24hrs_and_not_for_WordPress():
    # 6) 13:35 -> Leave as is just return
    # Given
    time = "13:35"
    isForWordPress = False
    # When
    result = zuhr_convert(time, isForWordPress)
    # Then
    assert result == "13:35"


# =============== asr_convert Tests ==================
def test_will_return_asr_time_in_12hrs_if_missing_0_for_WordPress():
    # 1a) 4:35 -> 04:35
    # Given
    time = "4:35"
    isForWordPress = True
    # When
    result = asr_convert(time, isForWordPress)
    # Then
    assert result == "04:35"

def test_will_return_asr_time_in_24hrs_if_missing_0_and_not_for_WordPress():
    # 1b) 4:35 -> 16:35
    # Given
    time = "4:35"
    isForWordPress = False
    # When
    result = asr_convert(time, isForWordPress)
    # Then
    assert result == "16:35"

def test_will_return_asr_time_in_12hrs_for_WordPress():
    # 2a) 04:35 -> 04:35
    # Given
    time = "04:35"
    isForWordPress = True
    # When
    result = asr_convert(time, isForWordPress)
    # Then
    assert result == "04:35"
def test_will_return_asr_time_in_24hrs_if_in_12hrs_and_not_for_WordPress():
    # 2b) 04:35 -> 16:35
    # Given
    time = "04:35"
    isForWordPress = False
    # When
    result = asr_convert(time, isForWordPress)
    # Then
    assert result == "16:35"

def test_will_return_asr_time_if_in_12hrs_if_in_24hrs_and_for_wordPress():
    # 3a) 16:35 -> 04:35
    # Given
    time = "16:35"
    isForWordPress = True
    # When
    result = asr_convert(time, isForWordPress)
    # Then
    assert result == "04:35"
def test_will_return_asr_time_if_in_24hrs_already_and_not_for_wordPress():
    # 3b) 16:35 -> leave as is just return
    # Given
    time = "16:35"
    isForWordPress = False
    # When
    result = asr_convert(time, isForWordPress)
    # Then
    assert result == "16:35"



# =============== maghrib_convert Tests ==================
def test_will_return_maghrib_time_in_24hrs_if_missing_0():
    # 1) 9:35 -> 21:35
    # Given
    time = "9:35"
    # When
    result = maghrib_convert(time)
    # Then
    assert result == "21:35"

def test_will_return_maghrib_time_in_24hrs_if_in_12hrs():
    # 2) 09:35 -> 21:35
    # Given
    time = "09:35"
    # When
    result = maghrib_convert(time)
    # Then
    assert result == "21:35"

def test_will_return_maghrib_time_if_in_24hrs_already():
    # 2) 21:35 -> 21:35
    # Given
    time = "21:35"
    # When
    result = maghrib_convert(time)
    # Then
    assert result == "21:35"


# =============== isha_convert Tests ==================
def test_will_return_isha_time_in_24hrs_if_missing_0():
    # 1) 7:35 -> 19:35
    # Given
    time = "7:35"
    # When
    result = isha_convert(time)
    # Then
    assert result == "19:35"

def test_will_return_maghrib_time_in_24hrs_if_in_12hrs_with_0_in_front():
    # 2) 07:35 -> 19:35
    # Given
    time = "07:35"
    # When
    result = isha_convert(time)
    # Then
    assert result == "19:35"

def test_will_convert_isha_time_to_24hrs_if_in_12hrs():
    # 3) 11:15 -> 23:15
    # Given
    time = "11:35"
    # When
    result = isha_convert(time)
    # Then
    assert result == "23:35"

def test_will_return_isha_time_if_already_in_24hrs():
    # 4) 19:35 -> leave as is just return
    # 5) 22:35 -> leave as is just return
    # Given
    time = "19:35"
    time2 = "22:15"
    # When
    result = isha_convert(time)
    result2 = isha_convert(time2)
    # Then
    assert result == "19:35"
    assert result2 == "22:15"