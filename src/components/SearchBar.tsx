import React from 'react';
import { View, TouchableOpacity, ViewStyle, TextStyle, ScrollView } from 'react-native';
import { AppInput } from './AppInput';
import { AppButton } from './AppButton';
import { AppText } from './AppText';
import { useThemeColors } from '../theme/useThemeColors';
import { createSearchBarStyles } from './styles/SearchBar.styles';

interface Suggestion {
  place_id: string;
  description: string;
}

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  onSuggestionSelect: (suggestion: Suggestion) => void;
  suggestions: Suggestion[];
  searching: boolean;
  placeholder?: string;
  searchButtonText?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSearch,
  onSuggestionSelect,
  suggestions,
  searching,
  placeholder = 'Enter city name...',
  searchButtonText = 'Search'
}) => {
  const colors = useThemeColors();
  const styles = createSearchBarStyles(colors);

  return (
    <View style={styles.searchBarContainer}>
      <AppInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.searchInput}
      />
      <AppButton
        title={searchButtonText}
        onPress={onSearch}
        loading={searching}
      />
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <ScrollView style={{flexGrow: 1}} >
          {suggestions.map((suggestion) => (
            <TouchableOpacity
              key={suggestion.place_id}
              style={styles.suggestionItem}
              onPress={() => onSuggestionSelect(suggestion)}
            >
              <AppText style={styles.suggestionText}>{suggestion.description}</AppText>
            </TouchableOpacity>
          ))}
      </ScrollView>
        </View>
      )}
    </View>
  );
}; 