from timeConverters import fajr_convert, zuhr_convert

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
