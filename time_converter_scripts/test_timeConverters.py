from timeConverters import fajr_convert, zuhr_convert, asr_convert, maghrib_convert, isha_convert

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
def test_will_return_zuhr_time_24hr_with_missing_0():
    # 1) 1:35 -> 13:35
    # Given
    time = "1:35"
    # When
    result = zuhr_convert(time)
    # Then
    assert result == "13:35"

def test_will_return_zuhr_time_in_24hrs_with_0_infront():
    # 2) 01:35 -> 13:35
    # Given
    time = "01:35"
    # When
    result = zuhr_convert(time)
    # Then
    assert result == "13:35"

def test_will_return_zuhr_time_before_1_PM():
    # 3) 11:35/12:35 -> leave as is just return
    # Given
    time = "11:35"
    time2 = "12:45"
    # When
    result = zuhr_convert(time)
    result2 = zuhr_convert(time2)
    # Then
    assert result == "11:35"
    assert result2 == "12:45"

def test_will_return_zuhr_time_if_already_24hrs():
    # 4) 13:35 -> Leave as is just return
    # Given
    time = "13:35"
    # When
    result = zuhr_convert(time)
    # Then
    assert result == "13:35"


# =============== asr_convert Tests ==================
def test_will_return_asr_time_in_24hrs_if_missing_0():
    # 1) 4:35 -> 16:35
    # Given
    time = "4:35"
    # When
    result = asr_convert(time)
    # Then
    assert result == "16:35"

def test_will_return_asr_time_in_24hrs_if_in_12hrs():
    # 2) 04:35 -> 16:35
    # Given
    time = "04:35"
    # When
    result = asr_convert(time)
    # Then
    assert result == "16:35"

def test_will_return_asr_time_if_in_24hrs_already():
    # 2) 16:35 -> 16:35
    # Given
    time = "16:35"
    # When
    result = asr_convert(time)
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